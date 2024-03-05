const { Router } = require('express')
const { Order } = require('../db')
const { getAllOrders, addOrder, changeProperty } = require('../controllers/orders.controller')

const router = Router()

router.get('/', getAllOrders)
router.get('/:userId', getAllOrders)

router.post('/', addOrder)

router.delete('/', async (req, res) => {
    const {id} = req.query
    try {
        if (!id) return res.status(300).json({message: 'id can\'t be undefined'})
        const orderToRemove = await Order.findByPk(id)
        if (!orderToRemove) return res.status(200).json({message: `order with id:${id} does not exist`})
        await orderToRemove.destroy()
        res.status(200).json({message: `order with id:${id} had been removed successfully`})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.put('/', changeProperty )
router.put('/:id', changeProperty )

module.exports = router