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

const { Role, User, Order, Store, OrderPizza, Pizza, PizzaIngredient, PizzaExtraIngredient, PizzaCharacteristic, PizzaMass, PizzaSize, Schedule, ScheduleHours, ExtraIngredientsxOrderPizza, KindProduct, ItemsxOrder, OtherOrders, PizzaCost, DeliveryInformation } = db.models

// Relación entre usuarios y roles
Role.hasMany(User)
User.belongsTo(Role)

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

// Relación entre tamaño de la pizza y masa
PizzaMass.belongsToMany(PizzaSize, {
  through: 'PizzaCharacteristic'
})

PizzaSize.belongsToMany(PizzaMass, {
  through: 'PizzaCharacteristic'
})

PizzaCharacteristic.addScope('primary', {
  attributes: ["PizzaMassId", "PizzaSizeId"],
  primaryKey: true
})

// Relación entre schedule y las horas y dias
Schedule.belongsToMany(ScheduleHours, {
  through: 'SchedulexScheduleHours',
  timestamps: false
})
ScheduleHours.belongsToMany(Schedule, {
  through: 'SchedulexScheduleHours',
  timestamps: false
})

// Relación entre Orden y Tipo de Producto
Order.hasMany(ItemsxOrder)
ItemsxOrder.belongsTo(Order)

KindProduct.hasMany(ItemsxOrder)
ItemsxOrder.belongsTo(KindProduct)

// Relación entre Orden de Pizza e ingredientes extra, e Ingredinetes a quitar
OrderPizza.belongsToMany(PizzaIngredient, {
  through: 'IngredientsOutxOrderPizza',
  timestamps: false
})
PizzaIngredient.belongsToMany(OrderPizza, {
  through: 'IngredientsOutxOrderPizza',
  timestamps: false
})

OrderPizza.belongsToMany(PizzaExtraIngredient, {
  through: ExtraIngredientsxOrderPizza,
  timestamps: false
})
PizzaExtraIngredient.belongsToMany(OrderPizza, {
  through: ExtraIngredientsxOrderPizza,
  timestamps: false
})

// Relación entre Otras ordenes y Tipo de Producto
KindProduct.hasMany(OtherOrders)
OtherOrders.belongsTo(KindProduct)

// Relación entre la pizza, sus caracteristicas costo

Pizza.belongsToMany(PizzaCharacteristic, {
  through: 'PizzaCost'
})

PizzaCharacteristic.belongsToMany(Pizza, {
  through: 'PizzaCost'
})

PizzaCost.addScope('primary', {
  attributes: ["PizzaId", "PizzaCharacteristicId"],
  primaryKey: true
})

// Relación entre DeliveryInformation y la Orden

Order.hasOne(DeliveryInformation)
DeliveryInformation.belongsTo(Order)

async function initDB() {
    try {
        // await db.sync({ force: true })
        await db.sync({ alter: true })
        console.log('Connection with database has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = { initDB, ...db.models }