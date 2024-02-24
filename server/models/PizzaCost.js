const {DataTypes} = require('sequelize')

function PizzaCost(database) {
    database.define( 'PizzaCost', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
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