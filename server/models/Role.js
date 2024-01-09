const {DataTypes} = require('sequelize')

function Role(database) {
    database.define( 'Role', {
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
    }, {
        timestamps: false
    })
}

module.exports = Role