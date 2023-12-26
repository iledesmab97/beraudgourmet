const {DataTypes} = require('sequelize')

function PizzaSize(database) {
    database.define( 'PizzaSize', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        size: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
    }, {
        timestamps: false
    })
}

module.exports = PizzaSize