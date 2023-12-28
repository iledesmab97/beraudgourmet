const {DataTypes} = require('sequelize')

function ExtraIngredientsxOrderPizza(database) {
    database.define( 'ExtraIngredientsxOrderPizza', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cost:{
            type: DataTypes.STRING,
        },
    }, {
        timestamps: false,
        freezeTableName: true
    })
}

module.exports = ExtraIngredientsxOrderPizza