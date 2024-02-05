const {DataTypes} = require('sequelize')

function PizzaExtraIngredient(database) {
    database.define( 'PizzaExtraIngredient', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        cost:{
            type: DataTypes.STRING,
        },
    }, {
        timestamps: false
    })
}

module.exports = PizzaExtraIngredient