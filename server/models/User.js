const {DataTypes} = require('sequelize')

function User(database) {
    database.define( 'User', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phoneNumber: {
            type: DataTypes.STRING,
        },
        promotion: {
            type: DataTypes.BOOLEAN,
        },
    }, {
        timestamps: false
    })
}

module.exports = User