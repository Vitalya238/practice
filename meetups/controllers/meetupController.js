const MeetupService = require('../services/meetupService');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

class MeetupController {
  async getAllMeetup(req, res) {
    try {
      const result = await MeetupService.getAllMeetups(req.query);
      res.json({
        totalItems: result.count,
        totalPages: Math.ceil(result.count / req.query.limit),
        currentPage: parseInt(req.query.page) || 1,
        data: result.rows
      });
    } catch (error) {
      console.error('Error fetching meetups:', error);
      res.status(500).json({ error: 'Error' });
    }
  }

  async findMeetupById(req, res) {
    try {
      const meetup = await MeetupService.getMeetupById(req.params.id);
      if (meetup) {
        return res.status(200).json(meetup);
      } else {
        return res.status(404).send('[ERROR] 404: Meetup not found.');
      }
    } catch (error) {
      console.error('Error fetching meetup:', error);
      res.status(500).json({ error: 'Error' });
    }
  }

  async createMeetup(req, res) {
    try {
      const meetup = await MeetupService.createMeetup(req.body);
      return res.status(201).json(meetup);
    } catch (error) {
      console.error('Error creating meetup:', error);
      res.status(500).json({ error: 'Error' });
    }
  }

  async updateMeetup(req, res) {
    try {
      const meetup = await MeetupService.updateMeetup(req.params.id, req.body);
      return res.status(200).json(meetup);
    } catch (error) {
      console.error('Error updating meetup:', error);
      res.status(500).json({ error: 'Error' });
    }
  }

  async deleteMeetup(req, res) {
    try {
      await MeetupService.deleteMeetup(req.params.id);
      res.status(200).json({ message: 'Meetup deleted' });
    } catch (error) {
      console.error('Error deleting meetup:', error);
      res.status(500).json({ error: 'Error' });
    }
  }

  async subscribeToMeetup(req, res) {
    try {
      const token = req.cookies["access-token"];
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      let decoded;
      try {
        decoded = jwt.verify(token, jwtSecret);
      } catch (error) {
        console.error('Failed to verify token:', error);
        return res.status(403).json({ message: 'Invalid token' });
      }

      const userMeetup = await MeetupService.subscribeToMeetup(decoded.sub, req.body.meetupid);
      return res.status(201).json(userMeetup);
    } catch (error) {
      console.error('Error subscribing to meetup:', error);
      res.status(500).json({ error: 'Error' });
    }
  }
}

module.exports = new MeetupController();
