const sequelize = require('../config/connection');
const { User } = require('../models');

const userdata = [
  {
    username: 'Pat',
    email: 'nwestnedge0@cbc.ca',
    password: 'password123'
  },
  {
    username: 'Charlie',
    email: 'rmebes1@sogou.com',
    password: 'password123'
  },
  {
    username: 'Wendy',
    email: 'cstoneman2@last.fm',
    password: 'password123'
  },
  {
    username: 'Elizabeth',
    email: 'ihellier3@goo.ne.jp',
    password: 'password123'
  },
  {
    username: 'Diane',
    email: 'gmidgley4@weather.com',
    password: 'password123'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
