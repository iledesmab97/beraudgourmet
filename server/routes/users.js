const { Router } = require('express')
const {User} = require('../db')

const router = Router()

router.get('/', async (req, res) => {
    console.log('En efecto, funciona bien es con express')
    res.json({message: '¡Hola Mundo!'})
})

module.exports = router