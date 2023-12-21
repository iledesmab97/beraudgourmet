const { Router } = require('express')
const {PizzaIngredient} = require('../db')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const allPizzaIngredients = await PizzaIngredient.findAll()
        res.status(200).json(allPizzaIngredients)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    try {
        const newPizzaIngredient = await PizzaIngredient.create({...req.body})
        res.status(200).json(newPizzaIngredient)
    } catch(error) {
        const {message, parent} = error
        res.status(400).json({message, parent: parent.message})
    }
})

router.delete('/', async (req, res) => {
    const {id} = req.query
    try {
        if (!id) return res.status(300).json({message: 'id can\'t be undefined'})
        const pizzaIngredientToRemove = await PizzaIngredient.findByPk(id)
        if (!pizzaIngredientToRemove) return res.status(200).json({message: `pizzaIngredient with id:${id} does not exist`})
        await pizzaIngredientToRemove.destroy()
        res.status(200).json({message: `pizzaIngredient with id:${id} had been removed successfully`})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router