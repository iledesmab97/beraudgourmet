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
        cost:{
            type: DataTypes.STRING,
            allowNull: false
        },
        OrderItemId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        timestamps: false,
        freezeTableName: true
    })
}

module.exports = ItemsxOrder