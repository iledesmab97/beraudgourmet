const { Router } = require('express')
const {PizzaExtraIngredient} = require('../db')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const allPizzaExtraIngredients = await PizzaExtraIngredient.findAll()
        res.status(200).json(allPizzaExtraIngredients)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    try {
        const newPizzaExtraIngredient = await PizzaExtraIngredient.create({...req.body})
        res.status(200).json(newPizzaExtraIngredient)
    } catch(error) {
        const {message, parent} = error
        res.status(400).json({message, parent: parent.message})
    }
})

router.delete('/', async (req, res) => {
    const {id} = req.query
    try {
        if (!id) return res.status(300).json({message: 'id can\'t be undefined'})
        const pizzaExtraIngredientToRemove = await PizzaExtraIngredient.findByPk(id)
        if (!pizzaExtraIngredientToRemove) return res.status(200).json({message: `pizzaExtraIngredient with id:${id} does not exist`})
        await pizzaExtraIngredientToRemove.destroy()
        res.status(200).json({message: `pizzaExtraIngredient with id:${id} had been removed successfully`})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router