const { Router } = require('express')

const { getAllPizzaCharacteristics, addPizzaCharacteristics, removePizzaCharacteristics } = require('../controllers/pizzaCharacteristics.controller')

const router = Router()

router.get('/', getAllPizzaCharacteristics)

router.post('/', addPizzaCharacteristics)

router.delete('/', removePizzaCharacteristics)

module.exports = router