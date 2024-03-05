const {DataTypes} = require('sequelize')

function ItemsxOrder(database) {
    database.define( 'ItemsxOrder', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        costPerUnity:{
            type: DataTypes.STRING,
            allowNull: false
        },
        totalCostByItem:{
            type: DataTypes.STRING,
            allowNull: false
        },
        OrderItemId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    })
}

module.exports = ItemsxOrder