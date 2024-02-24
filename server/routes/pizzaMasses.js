const { Router } = require('express')

const { getAllPizzaMasses, addPizzaMass, addSizesToPizzaMass, removePizzaMass } = require('../controllers/pizzaMasses.controller')

const router = Router()

router.get('/', getAllPizzaMasses)

router.post('/', addPizzaMass )

router.put('/', addSizesToPizzaMass )

router.delete('/', removePizzaMass )

module.exports = router