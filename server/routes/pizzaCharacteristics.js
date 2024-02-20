const { Router } = require('express')

const { getPizzaCharacteristics, getPizzaCharacteristicWithData, addPizzaCharacteristics, removePizzaCharacteristics } = require('../controllers/pizzaCharacteristics.controller')

const router = Router()

router.get('/', getPizzaCharacteristics)

router.post('/', addPizzaCharacteristics)

router.delete('/', removePizzaCharacteristics)

module.exports = router