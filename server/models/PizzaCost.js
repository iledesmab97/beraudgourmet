const {DataTypes} = require('sequelize')

function PizzaCost(database) {
    database.define( 'PizzaCost', {
        cost:{
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("cost", value)
                this.setDataValue("costIVA", `${Math.ceil(Number(value)*1.16*100)/100}`)
            }
        },
        costIVA:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false
    })
}

module.exports = PizzaCost