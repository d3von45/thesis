const { Sequelize } = require('sequelize');

const db = new Sequelize('marketplace', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = db;
