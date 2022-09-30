const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Comment = db.define({
    desc: {
        type: DataTypes.STRING
    },
    idOwner: {
        type: DataTypes.INTEGER
    },
    idProduct: {
        type: DataTypes.INTEGER
    }
});