const express = require('express');
const router = express.Router();
const meetupController = require('../controllers/meetupController');
const { createMeetupSchema, updateMeetupSchema } = require('../dto/meetupDTO');
const validateRequest = require('../middleware/validateRequest');
const checkOrganizer = require('../middleware/checkOrganizer');

router.get('/', meetupController.getAllMeetup);
router.get('/:id', meetupController.getOneMeetup);
router.post('/', validateRequest(createMeetupSchema), checkOrganizer, meetupController.createMeetup);
router.put('/:id', validateRequest(updateMeetupSchema), checkOrganizer, meetupController.updateMeetup);
router.delete('/:id', checkOrganizer, meetupController.deleteMeetup);
router.post('/subscribe', meetupController.subscribeToMeetup);

module.exports = router;
