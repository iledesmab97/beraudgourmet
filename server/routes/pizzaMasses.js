const { Router } = require('express')

const { getAllPizzaMasses, addPizzaMass, removePizzaMass } = require('../controllers/pizzaMasses.controller')

const router = Router()

router.get('/', getAllPizzaMasses)

router.post('/', addPizzaMass )

router.delete('/', removePizzaMass )

module.exports = router