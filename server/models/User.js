const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define('users', {
    fullname: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    avatarURL: {
        type: DataTypes.STRING
    },
    avatar: {
        type: DataTypes.BLOB('long')
    }
});


module.exports = User;