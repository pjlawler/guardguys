const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Event extends Model {}

Event.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    start_time: {
        type: DataTypes.STRING,
        allownull: false
    },
    event: {
        type: DataTypes.STRING,
        allowNull: false
    },
    onsite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    notes: {
        type: DataTypes.STRING
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3600000
    },
    recurring: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        // references: {
        //     model: 'user',
        //     key: 'id'
        //   }
    }
},{
    sequelize,
    timestamps: true,
    freezeTableName: false,
    underscored: true,
    modelName: 'event'
});

module.exports = Event;