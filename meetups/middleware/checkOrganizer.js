const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const checkOrganizer = async (req, res, next) => {
    const token = req.cookies["access-token"];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.error('Failed to verify token:', err);
        return res.status(403).json({ message: 'Invalid token' });
    }

    try {
        const user = await User.findOne({ where: { id: decoded.sub } });
        if (!user || user.role !== 'organizer') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = user;
        next();
    } catch (err) {
        console.error('Error finding user:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = checkOrganizer;
