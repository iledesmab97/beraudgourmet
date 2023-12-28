const {DataTypes} = require('sequelize')

function Order(database) {
    database.define( 'Order', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cost: {
            type: DataTypes.STRING,
            allowNull: false
        },
        applicationDate: {
            type: DataTypes.STRING
        },
        deliveryDate: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    })
}

module.exports = Order