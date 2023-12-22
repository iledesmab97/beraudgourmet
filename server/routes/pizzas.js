const { Router } = require('express')
const {Pizza} = require('../db')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const allPizzas = await Pizza.findAll()
        res.status(200).json(allPizzas)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    try {
        const {ingredients} = req.body
        const newPizza = await Pizza.create({...req.body})
        newPizza.addPizzaIngredient(ingredients)
        res.status(200).json(newPizza)
    } catch(error) {
        const {message, parent} = error
        res.status(400).json({message, parent: parent.message})
    }
})

router.delete('/', async (req, res) => {
    const {id} = req.query
    try {
        if (!id) return res.status(300).json({message: 'id can\'t be undefined'})
        const pizzaToRemove = await Pizza.findByPk(id)
        if (!pizzaToRemove) return res.status(200).json({message: `pizza with id:${id} does not exist`})
        await pizzaToRemove.destroy()
        res.status(200).json({message: `pizza with id:${id} had been removed successfully`})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router