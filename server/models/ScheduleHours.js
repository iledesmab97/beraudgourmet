const {DataTypes} = require('sequelize')

function ScheduleHours(database) {
    database.define( 'ScheduleHours', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        day: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false
    })
}

module.exports = ScheduleHours