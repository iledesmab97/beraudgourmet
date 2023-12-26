const { Router } = require('express')
const {PizzaSize} = require('../db')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const allPizzaSizes = await PizzaSize.findAll()
        res.status(200).json(allPizzaSizes)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    const {single} = req.query
    try {
        if (single && JSON.parse(single)) {
            const newPizzaSizes = await PizzaSize.create(req.body)
            return res.status(200).json(newPizzaSizes)    
        }
        const newPizzaSizes = await PizzaSize.bulkCreate(req.body)
        res.status(200).json(newPizzaSizes)
    } catch(error) {
        const {message, parent} = error
        res.status(400).json({message, parent: parent.message})
    }
})

router.delete('/', async (req, res) => {
    const {id} = req.query
    try {
        if (!id) return res.status(300).json({message: 'id can\'t be undefined'})
        const pizzaSizeToRemove = await PizzaSize.findByPk(id)
        if (!pizzaSizeToRemove) return res.status(200).json({message: `pizzaSize with id:${id} does not exist`})
        await pizzaSizeToRemove.destroy()
        res.status(200).json({message: `pizzaSize with id:${id} had been removed successfully`})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router