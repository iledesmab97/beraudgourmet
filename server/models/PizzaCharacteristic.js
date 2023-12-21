const {DataTypes} = require('sequelize')

function PizzaCharacteristic(database) {
    database.define( 'PizzaCharacteristic', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false
        },
        masaType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cost:{
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false
    })
}

module.exports = PizzaCharacteristic