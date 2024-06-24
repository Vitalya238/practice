const Meetup = require('../models/meetupModel');
const { Op } = require('sequelize');

class meetupController {

    async getAllMeetup(req, res) {
        try {
          const { search, sort, order, page = 1, limit = 3, startDate, endDate } = req.query;
          
          let where = {};
          if (search) {
            where.title = { [Op.like]: `%${search}%` };
          }
    
          if (startDate && endDate) {
            where.event_time = {
              [Op.between]: [new Date(startDate), new Date(endDate)]
            };
          } else if (startDate) {
            where.event_time = {
              [Op.gte]: new Date(startDate)
            };
          } else if (endDate) {
            where.event_time = {
              [Op.lte]: new Date(endDate)
            };
          }
    
          let orderOption = [];
          if (sort) {
            orderOption = [[sort, order || 'ASC']];
          }
    
          const offset = (page - 1) * limit;
    
          const { count, rows } = await Meetup.findAndCountAll({
            where,
            order: orderOption,
            limit: parseInt(limit),
            offset
          });
    
          res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            data: rows
          });
        } catch (error) {
          console.error('Error fetching meetups:', error);
          res.status(500).json({ error: 'Error' });
        }
      }

    async getOneMeetup(req, res) {
        try {
            const meetup = await Meetup.findOne({
                where: {
                    meetup_id: req.params.id
                },
            });
            if (meetup) {
                return res.status(200).end(JSON.stringify(meetup, null, 4));
            } else {
                return res.status(404).send('[ERROR] 404: Meetup not found.');
            }
        } catch (err) {
            console.log(err);
            res.status(403).send('[ERROR]' + err);
        }
    }


    async createMeetup(req, res) {
        try {
            const meetupExist = await Meetup.findOne({
                where: {
                    meetup_id: req.body.id,
                    title: req.body.title
                }
            });
            if (meetupExist)
                return res.status(409).send('[ERROR] 409: Meetup with such name already exists.');
            const meetup = await Meetup.create({
                meetup_id: req.body.id,
                title: req.body.title,
                description: req.body.description,
                tags: req.body.tags,
                event_time: req.body.event_time,
                location: req.body.location
            });
            return res.status(201).end(JSON.stringify(meetup, null, 4));
        } catch (err) {
            console.log(err);
            res.status(403).send('[ERROR]' + err);
        }
    }


    async updateMeetup(req, res) {
        try {
            const meetup = await Meetup.findOne({
                where: { meetup_id: req.params.id }
            });
            console.log('Meetup found:', meetup);

            const meetupWithSameTitle = await Meetup.findOne({
                where: { title: req.body.title }
            });
            console.log('Meetup with same title:', meetupWithSameTitle);

            if (meetupWithSameTitle && meetupWithSameTitle.meetup_id != req.params.id) {
                return res.status(409).send('[ERROR] 409: You already have a meetup with such name.');
            }

            if (meetup) {
                await Meetup.update(
                    {
                        title: req.body.title,
                        description: req.body.description,
                        tags: req.body.tags,
                        event_time: req.body.event_time,
                        location: req.body.location,
                    },
                    {
                        where: { meetup_id: req.params.id }
                    }
                );

                const meetupUpdated = await Meetup.findOne({
                    where: { meetup_id: req.params.id }
                });
                console.log('Meetup updated:', meetupUpdated);

                return res.status(200).end(JSON.stringify(meetupUpdated, null, 4));
            } else {
                return res.status(404).send('[ERROR] 404: Meetup not found.');
            }
        } catch (err) {
            console.error('Error during updateMeetup:', err);
            res.status(403).send('[ERROR]' + err);
        }
    }


    async deleteMeetup(req, res) {
        try {
            const meetup = await Meetup.findOne({
                where: {
                    meetup_id: req.params.id,
                },
            });
            if (meetup) {
                await Meetup.destroy({
                    where: {
                        meetup_id: req.params.id,
                    },
                });
                return res.status(200).end(JSON.stringify(meetup, null, 4));
            } else res.status(404).send('[ERROR] 404: There is no meetup with such id.');
        } catch (err) {
            console.log(err);
            res.status(403).send('[ERROR]');
        }
    }
}

module.exports = new meetupController();
