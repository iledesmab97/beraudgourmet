const {DataTypes} = require('sequelize')

function Order(database) {
    database.define( 'Order', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        totalCostByItems: {
            type: DataTypes.STRING,
            allowNull: false
        },
        commissions: {
            type: DataTypes.STRING
        },
        totalCost: {
            type: DataTypes.STRING
        },
        applicationDate: {
            type: DataTypes.STRING
        },
        deliveryDate: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    })
}

module.exports = Order