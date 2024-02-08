const {DataTypes} = require('sequelize')

function PizzaCharacteristic(database) {
    database.define( 'PizzaCharacteristic', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cost:{
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("cost", `${Math.ceil(Number(value)*1.16*100)/100}`)
            }
        },
    }, {
        timestamps: false
    })
}

module.exports = PizzaCharacteristic