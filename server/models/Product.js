const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Product = db.define({
    idOwner: {
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    },
    view: {
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.STRING
    },
    idCategory: {
        type: DataTypes.INTEGER
    }
});

module.exports = Product;