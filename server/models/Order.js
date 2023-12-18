const {DataTypes} = require('sequelize')

function Order(database) {
    database.define( 'Order', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idStore: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: {
            createdAt: 'application date',
            updateAt: false
        }
    })
}

module.exports = Order