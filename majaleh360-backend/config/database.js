const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('majaleh360_db', 'root', 'root', {
  host: 'localhost',
  port: 8889,
  dialect: 'mysql'
});

module.exports = sequelize;