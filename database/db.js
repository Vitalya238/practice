const { Sequelize, DataTypes } = require('sequelize');

const path = require('path');


const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'vitalya',
  username: 'vitalya',
  password: '7117',
  host: 'localhost',
  port:5432,
});

module.exports = sequelize;


async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();




