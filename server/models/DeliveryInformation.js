const {DataTypes} = require('sequelize')

function DeliveryInformation(database) {
    database.define( 'DeliveryInformation', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        typeResidence: {
            type: DataTypes.STRING,
        },
        businessOrBuilding: {
            type: DataTypes.STRING
        },
        street: {
            type: DataTypes.STRING
        },
        townOrCity: {
            type: DataTypes.STRING
        },
        note: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    })
}

module.exports = DeliveryInformation