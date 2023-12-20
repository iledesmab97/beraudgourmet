const express = require('express')
const routes = require('./routes/index')

const server = express()

server.use(express.json())

server.use('/api', routes)

module.exports = server