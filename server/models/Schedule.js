const {DataTypes} = require('sequelize')

function Schedule(database) {
    database.define( 'Schedule', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false
    })
}

module.exports = Schedule