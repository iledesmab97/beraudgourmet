const {DataTypes} = require('sequelize')

function Pizza(database) {
    database.define( 'Pizza', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        text: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    })
}

module.exports = Pizza