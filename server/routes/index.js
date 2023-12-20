const { Router } = require('express')
const usersMiddleware = require('./users')
const storesMiddleware = require('./stores')
const checkoutMiddleware = require('./checkout')

const router = Router()
router.use('/checkout', checkoutMiddleware)
router.use('/users', usersMiddleware)
router.use('/stores', storesMiddleware)

module.exports = router