const {DataTypes} = require('sequelize')

function OrderPizza(database) {
    database.define( 'OrderPizza', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idPizza: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idCharacteristicsPizza: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cost: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    })
}

module.exports = OrderPizza