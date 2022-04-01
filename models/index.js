const Event = require('./Event');
const User = require('./User');

User.hasMany(Event, {
    foreignKey: 'user_id',
    onDelete: 'set null'
});

Event.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'set null',
})

module.exports = { Event, User };