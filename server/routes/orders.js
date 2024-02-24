const { Router } = require('express')
const {Order, KindProduct, OrderPizza, ExtraIngredientsxOrderPizza, ItemsxOrder, PizzaCharacteristic, PizzaMass, PizzaSize, PizzaExtraIngredient, PizzaIngredient, Pizza } = require('../db')
const { getAllOrders, addOrder } = require('../controllers/orders.controller')

const router = Router()

router.get('/', getAllOrders)

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

module.exports = router