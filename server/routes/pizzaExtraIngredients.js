const { Router } = require('express')
const { getAllPizzaExtraIngredients, addPizzaExtraIngredients, removePizzaExtraIngredients } = require('../controllers/pizzaExtraIngredients.controller')

const router = Router()

router.get('/', getAllPizzaExtraIngredients)

router.post('/', addPizzaExtraIngredients)

router.delete('/', removePizzaExtraIngredients)

module.exports = router