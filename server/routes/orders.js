const { Router } = require('express')
const {Order} = require('../db')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const allOrders = await Order.findAll()
        res.status(200).json(allOrders)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    try {
        const {storeId, cost, applicationDate, deliverDate, userId} = req.body
        const newOrder = await Order.create({storeId, cost, applicationDate, deliverDate})
        await newOrder.setUser(userId)
        await newOrder.setStore(storeId)
        return res.status(200).json(newOrder)
    } catch(error) {
        const {message, parent} = error
        return res.status(400).json({message, parent: parent?.message})
    }
})

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