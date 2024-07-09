const MeetupRepository = require('../repositories/meetupRepository');
const { Op } = require('sequelize');

class MeetupService {
  async getAllMeetups(query) {
    const { search, sort, order, page = 1, limit = 3, startDate, endDate } = query;

    let where = {};
    if (search) {
      console.log('Adding search condition:', `%${search}%`);
      where.title = { [Op.like]: `%${search}%` };
    }

    if (startDate && endDate) {
      where.event_time = { [Op.between]: [new Date(startDate), new Date(endDate)] };
    } else if (startDate) {
      where.event_time = { [Op.gte]: new Date(startDate) };
    } else if (endDate) {
      where.event_time = { [Op.lte]: new Date(endDate) };
    }

    let orderOption = [];
    if (sort) {
      orderOption = [[sort, order || 'ASC']];
    }

    const offset = (page - 1) * limit;

    return await MeetupRepository.findAndCountAllMeetups(where, orderOption, limit, offset);
  }

  async getMeetupById(id) {
    return await MeetupRepository.findMeetupById(id);
  }

  async createMeetup(data) {
    return await MeetupRepository.createMeetup(data);
  }

  async updateMeetup(id, data) {
    const existingMeetup = await MeetupRepository.findMeetupById(id);
    if (!existingMeetup) {
      throw new Error('Meetup not found');
    }

    return await MeetupRepository.updateMeetup(id, data);
  }

  async deleteMeetup(id) {
    const existingMeetup = await MeetupRepository.findMeetupById(id);
    if (!existingMeetup) {
      throw new Error('Meetup not found');
    }

    return await MeetupRepository.deleteMeetup(id);
  }

  async subscribeToMeetup(userid, meetupid) {
    const userMeetupExist = await MeetupRepository.findUserMeetup(userid, meetupid);
    if (userMeetupExist) {
      throw new Error('User already subscribed to this meetup');
    }

    return await MeetupRepository.createUserMeetup({ userid, meetupid });
  }
}

module.exports = new MeetupService();
