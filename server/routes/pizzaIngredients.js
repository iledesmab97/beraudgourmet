const { Router } = require('express')
const {PizzaIngredient} = require('../db')

const { getAllPizzaIngredients, addPizzaIngredients, removePizzaIngredients } = require('../controllers/pizzaIngredients.controller')

const router = Router()

router.get( '/', getAllPizzaIngredients )

router.post( '/', addPizzaIngredients )

router.delete('/', removePizzaIngredients)

module.exports = router