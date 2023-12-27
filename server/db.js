require('dotenv').config({ path: '.env.local'})
const fs = require('fs')
const path = require('path')
const {Sequelize} = require('sequelize')

const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME} = process.env

const db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {logging: false})

const basename = path.basename(__filename)
const modelDefiners = []

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(db))

let entries = Object.entries(db.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
db.models = Object.fromEntries(capsEntries)

const { User, Order, Store, Pizza, PizzaIngredient, PizzaCharacteristic, PizzaMass, PizzaSize, Schedule, ScheduleHours } = db.models

// Relacion entre ordenes, usuarios y tiendas
User.hasMany(Order)
Order.belongsTo(User)

Store.hasMany(Order)
Order.belongsTo(Store)

// Relación entre pizzas e ingredientes
Pizza.belongsToMany(PizzaIngredient, {
  through: 'IngredientsxPizza',
  timestamps: false
})
PizzaIngredient.belongsToMany(Pizza, {
  through: 'IngredientsxPizza',
  timestamps: false
})

// Relación entre tamaño de la pizza, Maza y costo
PizzaMass.hasMany(PizzaCharacteristic)
PizzaCharacteristic.belongsTo(PizzaMass)

PizzaSize.hasMany(PizzaCharacteristic)
PizzaCharacteristic.belongsTo(PizzaSize)

// Relación entre schedule y las horas y dias
Schedule.belongsToMany(ScheduleHours, {
  through: 'SchedulexScheduleHours',
  timestamps: false
})
ScheduleHours.belongsToMany(Schedule, {
  through: 'SchedulexScheduleHours',
  timestamps: false
})

async function initDB() {
    try {
        await db.sync({ force: true })
        console.log('Connection with database has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = { initDB, ...db.models }