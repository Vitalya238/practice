const express = require('express');
const router = express.Router();
const meetupController = require('../controllers/meetupController');
const jwt = require('jsonwebtoken');
const { createMeetupSchema, updateMeetupSchema } = require('../dto/meetupDTO');
const User = require('../models/userModel');
const validateRequest = require('../middleware/validateRequest');

async function checkOrganizer(req, res, next) {
    const token = req.cookies["access-token"];
    console.log(`access-token: ${req.cookies["access-token"]}`);
    console.log(`cookie: ${req.cookies}`);
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

    const user = await User.findOne({ where: { id: decoded.sub } });
    if (!user || user.role !== 'organizer') {
        return res.status(403).json({ message: 'Forbidden' });
    }

    req.user = user;
    next();
}

router.get('/', meetupController.getAllMeetup);
router.get('/:id', meetupController.getOneMeetup);
router.post('/', validateRequest(createMeetupSchema), checkOrganizer, meetupController.createMeetup);
router.put('/:id', validateRequest(updateMeetupSchema), checkOrganizer, meetupController.updateMeetup);
router.delete('/:id', checkOrganizer, meetupController.deleteMeetup);
router.post('/subscribe', meetupController.subscribeToMeetup);

module.exports = router;
