const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Campaign = sequelize.define('Campaign', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  businessId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('Email', 'SMS', 'Social Media'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Draft', 'Active', 'Completed'),
    defaultValue: 'Draft',
  },
});

module.exports = Campaign;