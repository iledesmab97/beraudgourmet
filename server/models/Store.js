const {DataTypes} = require('sequelize')

function Store(database) {
    database.define( 'Store', {
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
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            // allowNull: false,
            // unique: true
        },
        coordinates: {
            type: DataTypes.JSON,
        },
    }, {
        timestamps: false
    })
}

module.exports = Store