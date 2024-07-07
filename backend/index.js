// models/index.js

const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const User = require('./user')(sequelize, DataTypes);
const Order = require('./order')(sequelize, DataTypes);
const Payment = require('./payment')(sequelize, DataTypes);
const Product = require('./product')(sequelize, DataTypes);
const UserProfile = require('./userProfile')(sequelize, DataTypes);
const ChatMessages = require('./chatMessages')(sequelize, DataTypes);

const db = {
  sequelize,
  Sequelize,
  User,
  Order,
  Payment,
  Product,
  UserProfile,
  ChatMessages
};

module.exports = db;
