const express = require('express');
const router = express.Router();
const meetupController = require('../controllers/meetupController');
const { createMeetupSchema, updateMeetupSchema } = require('../dto/meetup_dto');

router.get('/', async (req, res) => {
    try {
      await meetupController.getAllMeetup(req, res);
    } catch (error) {
      console.error('Error in getAllMeetup router:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      await meetupController.getOneMeetup(req, res);
    } catch (error) {
      console.error('Error in getOneMeetup router:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.post('/', async (req, res) => {
    try {
      const { error } = createMeetupSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      await meetupController.createMeetup(req, res);
    } catch (error) {
      console.error('Error in createMeetup router:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.put('/:id', async (req, res) => {
    try {
      const { error } = updateMeetupSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      await meetupController.updateMeetup(req, res);
    } catch (error) {
      console.error('Error in updateMeetup router:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      await meetupController.deleteMeetup(req, res);
    } catch (error) {
      console.error('Error in deleteMeetup router:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;