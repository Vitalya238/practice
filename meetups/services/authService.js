const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserRepository = require('../repositories/userRepository');
const jwtSecret = process.env.JWT_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

let tokenBlacklist = [];

class AuthService {
  async register(username, password, role) {
    const existingUser = await UserRepository.findUserByUsername(username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserRepository.createUser({
      username,
      password: hashedPassword,
      role
    });

    const token = jwt.sign({ sub: user.id }, jwtSecret, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ sub: user.id }, refreshTokenSecret, { expiresIn: '7d' });

    user.refresh_token = refreshToken;
    await UserRepository.updateUser(user);

    return { token, refreshToken, user };
  }

  async login(username, password, token) {
    if (token && tokenBlacklist.includes(token)) {
      throw new Error('Token revoked. Please log in again.');
    }

    let decoded;
    if (token) {
      try {
        decoded = jwt.verify(token, jwtSecret);
      } catch (error) {
        throw new Error('Invalid token');
      }
    }

    if (decoded) {
      const user = await UserRepository.findUserById(decoded.sub);
      if (user) {
        return { message: 'Login successful', token };
      }
    }

    const user = await UserRepository.findUserByUsername(username);
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid username or password');
    }

    const newToken = jwt.sign({ sub: user.id }, jwtSecret, { expiresIn: '1h' });
    const newRefreshToken = jwt.sign({ sub: user.id }, refreshTokenSecret, { expiresIn: '7d' });

    user.refresh_token = newRefreshToken;
    await UserRepository.updateUser(user);

    return { message: 'Login successful', token: newToken };
  }

  async logout(token) {
    tokenBlacklist.push(token);
  }

}

module.exports = new AuthService();
