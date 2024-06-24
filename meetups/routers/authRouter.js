const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwtSecret = process.env.JWT_SECRET;

router.post('/register', async (req, res, next) => {
  try {
    const { username, password, role } = req.body;

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, password: hashedPassword, role });

    const token = jwt.sign({ sub: user.id }, jwtSecret, { expiresIn: '1h' });

    res.cookie('access-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 3600000
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error creating user:', error);
    next(error);
  }
});


router.post('/login', async (req, res, next) => {
  try {

    const token = req.cookies['access-token'];
    let decoded;

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

    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    if (isMatch && user) {

      const newToken = jwt.sign({ sub: user.id }, jwtSecret, { expiresIn: '1h' });
      

      res.cookie('access-token', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 360000
      });

      res.status(200).json({ message: 'Login successful' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    next(error);
  }
});

module.exports = router;
