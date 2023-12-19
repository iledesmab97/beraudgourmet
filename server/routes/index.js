const { Router } = require('express')
const usersMiddleware = require('./users')

const router = Router()
router.use('/users', usersMiddleware)

module.exports = router