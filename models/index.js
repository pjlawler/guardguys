const Event = require('./Event');
const User = require('./User');

Event.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Event, {
    foreignKey: 'user_id',
});


module.exports = { Event, User };