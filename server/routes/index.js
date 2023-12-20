const { Router } = require('express')
const usersMiddleware = require('./users')
const storesMiddleware = require('./stores')
const ordersMiddleware = require('./orders')
const checkoutMiddleware = require('./checkout')

const router = Router()
router.use('/checkout', checkoutMiddleware)
router.use('/users', usersMiddleware)
router.use('/stores', storesMiddleware)
router.use('/orders', ordersMiddleware)

module.exports = router