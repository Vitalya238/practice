const { DataTypes } = require('sequelize');
const sequelize = require('../database/db'); 
const User = require('./userModel');
const Meetup = require('./meetupModel');

User.belongsToMany(Meetup, { through: 'user_meetups', foreignKey: 'userId' });

Meetup.belongsToMany(User, { through: 'user_meetups', foreignKey: 'meetupId' });

const UserMeetup = sequelize.define('user_meetups', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  meetupid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'meetups',
      key: 'meetup_id'
    }
  }
}, {
  timestamps: false
});

module.exports = UserMeetup;
