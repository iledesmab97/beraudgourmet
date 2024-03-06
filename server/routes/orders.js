const { Router } = require('express')
const { Order } = require('../db')
const { getAllOrders, addOrder, removeOrder, changeProperty } = require('../controllers/orders.controller')

const router = Router()

router.get('/', getAllOrders)
router.get('/:userId', getAllOrders)

router.post('/', addOrder)

router.delete('/', removeOrder)

router.put('/', changeProperty )
router.put('/:id', changeProperty )

module.exports = router