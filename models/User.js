// models/User.js
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('SuperAdmin', 'Admin', 'BusinessUser'),
        allowNull: false,
    },
    business_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    profile_image: {
        type: DataTypes.STRING, // Store image URL or file path
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    two_factor_enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: false,
    tableName: 'users'
});

module.exports = User;
