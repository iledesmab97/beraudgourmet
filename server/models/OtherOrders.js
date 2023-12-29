const {DataTypes} = require('sequelize')

function OtherOrders(database) {
    database.define( 'OtherOrders', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cost: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })
}

module.exports = OtherOrders