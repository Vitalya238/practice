const Meetup = require('../models/meetupModel');
const UserMeetup = require('../models/userMeetupsModel');
const { Op } = require('sequelize');

class MeetupRepository {
  async findAndCountAllMeetups(where, orderOption, limit, offset) {
    return await Meetup.findAndCountAll({ where, order: orderOption, limit, offset });
  }

  async findMeetupById(meetupId) {
    return await Meetup.findOne({ where: { meetup_id: meetupId } });
  }

  async createMeetup(meetupData) {
    return await Meetup.create(meetupData);
  }

  async updateMeetup(meetupId, meetupData) {
    await Meetup.update(meetupData, { where: { meetup_id: meetupId } });
    return await Meetup.findOne({ where: { meetup_id: meetupId } });
  }

  async deleteMeetup(meetupId) {
    return await Meetup.destroy({ where: { meetup_id: meetupId } });
  }

  async findMeetupByTitle(title) {
    return await Meetup.findOne({ where: { title } });
  }

  async findUserMeetup(userid, meetupid) {
    return await UserMeetup.findOne({ where: { userid, meetupid } });
  }

  async createUserMeetup(userMeetupData) {
    return await UserMeetup.create(userMeetupData);
  }
}

module.exports = new MeetupRepository();
