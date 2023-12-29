const { Router } = require('express')
const { OtherOrders, KindProduct } = require('../db')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const allOtherOrders = await OtherOrders.findAll()
        res.status(200).json(allOtherOrders)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    try {
        const { kind, name, cost } = req.body
        const item = await KindProduct.findOne({
            attributes: ['id'],
            where: {
                name: kind
            }
        })
        const newOtherOrders = await OtherOrders.create({kind, name, cost})
        await newOtherOrders.setKindProduct([item.id])

        return res.status(200).json(newOtherOrders)
    } catch(error) {
        const {message, parent} = error
        return res.status(400).json({message, parent: parent?.message})
    }
})

router.delete('/', async (req, res) => {
    const {id} = req.query
    try {
        if (!id) return res.status(300).json({message: 'id can\'t be undefined'})
        const otherOrdersToRemove = await OtherOrders.findByPk(id)
        if (!otherOrdersToRemove) return res.status(200).json({message: `otherOrders with id:${id} does not exist`})
        await otherOrdersToRemove.destroy()
        res.status(200).json({message: `otherOrders with id:${id} had been removed successfully`})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router