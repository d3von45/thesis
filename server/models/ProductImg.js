const { DataTypes } = require('sequelize');
const db = require('../config/database');

const ProductImg = db.define({
    idProduct: {
        type: DataTypes.INTEGER
    },
    thumb: {
        type: DataTypes.BOOLEAN
    },
    img_data: {
        type: DataTypes.BLOB('long')
    }
});

module.exports = ProductImg;