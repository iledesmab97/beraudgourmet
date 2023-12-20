const {DataTypes} = require('sequelize')

function OrderPizza(database) {
    database.define( 'OrderPizza', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idOrder: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idPizza: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idCharacteristicsPizza: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}

module.exports = OrderPizza