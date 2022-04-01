
const Sequelize = require('sequelize');

const sequelize = new Sequelize('chore_tracker_db', 'root', 'BAngkok2017!!', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

module.exports = sequelize;