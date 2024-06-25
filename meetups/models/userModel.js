const { DataTypes } = require('sequelize');
const sequelize = require('../database/db'); 

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user'
  },
  refresh_token: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: true
  }
},
{
  timestamps: false
});

module.exports = User;
