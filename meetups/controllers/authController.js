const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwtSecret = process.env.JWT_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

let tokenBlacklist = [];

class AuthController {
    async register(req, res, next) {
        try {
            const { username, password, role } = req.body;

            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                username,
                password: hashedPassword,
                role
            });

            const token = jwt.sign({ sub: user.id }, jwtSecret, { expiresIn: '1h' });

            const refreshToken = jwt.sign({ sub: user.id }, refreshTokenSecret, { expiresIn: '7d' });

            user.refresh_token = refreshToken;
            await user.save();

            res.cookie('access-token', token, {
                maxAge: 3600000
            });

            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            console.error('Error creating user:', error);
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { username, password } = req.body;

            const token = req.cookies['access-token'];
            let decoded;

            if (token && tokenBlacklist.includes(token)) {
                return res.status(401).json({ message: 'Token revoked. Please log in again.' });
            }

            if (token) {
                try {
                    decoded = jwt.verify(token, jwtSecret);
                } catch (error) {
                    console.error('Invalid token:', error);
                    res.clearCookie('access-token');
                }
            }

            if (decoded) {
                const user = await User.findOne({ where: { id: decoded.sub } });
                if (user) {
                    return res.status(200).json({ message: 'Login successful' });
                }
            }

            const user = await User.findOne({ where: { username } });
            if (!user) {
                return res.status(400).json({ message: 'Invalid username or password' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid username or password' });
            }

            const newToken = jwt.sign({ sub: user.id }, jwtSecret, { expiresIn: '1h' });

            const newRefreshToken = jwt.sign({ sub: user.id }, refreshTokenSecret, { expiresIn: '7d' });

            user.refresh_token = newRefreshToken;
            await user.save();

            res.cookie('access-token', newToken, {
                maxAge: 3600000
            });

            res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            console.error('Error during login:', error);
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const token = req.cookies['access-token'];

            tokenBlacklist.push(token);

            res.clearCookie('access-token');

            res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            console.error('Error during logout:', error);
            next(error);
        }
    }
}

module.exports = new AuthController();
