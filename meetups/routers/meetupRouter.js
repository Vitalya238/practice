const express = require('express');
const router = express.Router();
const meetupController = require('../controllers/meetupController');
const { createMeetupSchema, updateMeetupSchema } = require('../dto/meetupDTO');
const validateRequest = require('../middleware/validateRequest');

router.get('/', meetupController.getAllMeetup);
router.get('/:id', meetupController.getOneMeetup);
router.post('/', validateRequest(createMeetupSchema), meetupController.createMeetup);
router.put('/:id', validateRequest(updateMeetupSchema), meetupController.updateMeetup);
router.delete('/:id', meetupController.deleteMeetup);
router.post('/subscribe', meetupController.subscribeToMeetup);

module.exports = router;
