require('dotenv').config({ path: '.env.local'})
const {Sequelize} = require('sequelize')

const {User} = require('./models/User')

const user = process.env.DB_USER
const pass = process.env.DB_PASSWORD
const host = process.env.DB_HOST
const port = process.env.DB_PORT
const dbname = process.env.DB_NAME

const db = new Sequelize(`postgres://${user}:${pass}@${host}:${port}/${dbname}`, {logging: false})

User(db)

async function initDB() {
    try {
        await db.sync({ force: true })
        console.log('Connection with database has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = { initDB }