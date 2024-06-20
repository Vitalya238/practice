const Joi = require('joi');

const createMeetupSchema = Joi.object({
  id: Joi.number().integer().required(),
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).required(),
  tags: Joi.array().items(Joi.string()),
  event_time: Joi.date().iso().required(),
  location: Joi.string().max(255).required()
});

const updateMeetupSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).required(),
  tags: Joi.array().items(Joi.string()),
  event_time: Joi.date().iso().required(),
  location: Joi.string().max(255).required()
});

module.exports = { createMeetupSchema, updateMeetupSchema };
