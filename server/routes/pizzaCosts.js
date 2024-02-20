const { Router } = require('express')

const { getAllPizzaCosts, addPizzaCosts } = require('../controllers/pizzaCosts.controller')
// const { getAllPizzaCharacteristics, addPizzaCharacteristics, removePizzaCharacteristics } = require('../controllers/pizzaCharacteristics.controller')

const router = Router()

router.get('/', getAllPizzaCosts)

router.post('/', addPizzaCosts)

// router.delete('/', removePizzaCharacteristics)

module.exports = router