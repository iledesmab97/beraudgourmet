const {DataTypes} = require('sequelize')

function KindProduct(database) {
    database.define( 'KindProduct', {
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

module.exports = KindProduct