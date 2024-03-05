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
        },
        StripeId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        paymentMethod: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'transfer',
        },
        delivery: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        closed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        paid: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }, {
        timestamps: false
    })
}

module.exports = Order