const {DataTypes} = require('sequelize')

function InvalidToken(database) {
    database.define( 'InvalidToken', {
        token: {
            type: DataTypes.TEXT,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
    }, {
        timestamps: false
    })
}

module.exports = InvalidToken