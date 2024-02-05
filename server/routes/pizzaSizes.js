const { Router } = require('express')

const { getAllPizzaSizes, addPizzaSizes, removePizzaSizes } = require('../controllers/pizzaSizes.controller')

const router = Router()

router.get('/', getAllPizzaSizes)

router.post('/', addPizzaSizes)

router.delete('/', removePizzaSizes)

module.exports = router