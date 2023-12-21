const {DataTypes} = require('sequelize')

function PizzaIngredient(database) {
    database.define( 'PizzaIngredient', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false
    })
}

module.exports = PizzaIngredient