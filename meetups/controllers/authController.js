const AuthService = require('../services/authService');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

class AuthController {
  async register(req, res, next) {
    try {
      const { username, password, role } = req.body;
      const { token, refreshToken, user } = await AuthService.register(username, password, role);

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

      try {
        const { message, token: newToken } = await AuthService.login(username, password, token);
        res.cookie('access-token', newToken, {
          maxAge: 3600000
        });

        res.status(200).json({ message });
      } catch (error) {
        res.clearCookie('access-token');
        throw error;
      }
    } catch (error) {
      console.error('Error during login:', error);
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const token = req.cookies['access-token'];
      await AuthService.logout(token);

      res.clearCookie('access-token');
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Error during logout:', error);
      next(error);
    }
  }

}

module.exports = new AuthController();
