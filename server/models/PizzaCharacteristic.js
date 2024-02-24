const {DataTypes} = require('sequelize')

function PizzaCharacteristic(database) {
    database.define( 'PizzaCharacteristic', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    }, {
        timestamps: false
    })
}

module.exports = PizzaCharacteristic