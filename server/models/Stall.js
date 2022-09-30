const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Stall = db.define({
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    website: {
        type: DataTypes.STRING
    },
    fb: {
        type: DataTypes.STRING
    },
    desc: {
        type: DataTypes.STRING
    },
    ghtk: {
        type: DataTypes.BOOLEAN
    },
    viettelpost: {
        type: DataTypes.BOOLEAN
    }
})