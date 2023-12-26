const {DataTypes} = require('sequelize')

function PizzaMass(database) {
    database.define( 'PizzaMass', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        text: {
            type: DataTypes.STRING
        },
    }, {
        timestamps: false
    })
}

module.exports = PizzaMass