const {DataTypes} = require('sequelize')
const bcryptjs = require('bcryptjs')

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
            allowNull: true,
            set(value) {
                this.setDataValue("password", bcryptjs.hashSync(value, 10))
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
            set(value) {
                this.setDataValue("phoneNumber", value.replaceAll(" ", ""))
            }
        },
        promotion: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }, {
        timestamps: false
    })
}

module.exports = User