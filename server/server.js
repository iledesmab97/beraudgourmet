const express = require('express')
const session = require('express-session')
const passport = require('passport')
const routes = require('./routes/index')
const morgan = require('morgan')

const server = express()
server.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
server.use(passport.initialize())
server.use(passport.session())
server.use(express.json())
server.use(morgan('dev'))

server.use('/api', routes)

module.exports = server