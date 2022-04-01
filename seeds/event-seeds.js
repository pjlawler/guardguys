const sequelize = require('../config/connection');
const { Event } = require('../models');

const eventdata = [
  {
    date: new Date("2022-03-31 08:00"),
    start_time: "08:00",
    event: "Open Clinic",
    user_id: 4
  },
  {
    date: new Date("2022-03-31 08:00"),
    start_time: "08:00",
    event: "Hoya - Preemployement Testing",
    notes: "Michelle called an said they would have at least 10 new-hires",
    onsite: true,
    user_id: 1
  },
  {
    date: new Date("2022-03-31 11:00"),
    start_time: "11:00",
    event: "DDC - DNA Testing (Blood Draw)",
    notes: "Expect preg. mother (blood) and father (buccal)",
    user_id: 2
  },
  {
    date: new Date("2022-04-01 08:00"),
    start_time: "08:00",
    event: "Open Clinic",
    notes: "",
    user_id: 2
  },
  {
    date: new Date("2022-04-01 15:00"),
    start_time: "15:00",
    event: "Ajax = Random Testing",
    onsite: true,
    notes: "",
    user_id: 1
  },
  {
    date: new Date("2022-04-01 13:00"),
    start_time: "13:00",
    event: "Observed - Collection (female)",
    user_id: 1
  },
  {
    date: new Date("2022-04-01 00:00"),
    start_time: "00:00",
    event: "On-Call",
    user_id: 3
  }
];

const seedEvents = () => Event.bulkCreate(eventdata, {individualHooks: true});

module.exports = seedEvents;
