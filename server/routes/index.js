const { Router } = require('express')
const usersMiddleware = require('./users')
const checkoutMiddleware = require('./checkout')

const router = Router()
router.use('/users', usersMiddleware)
router.use('/checkout', checkoutMiddleware)

module.exports = router