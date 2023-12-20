const { Router } = require('express')
const {Store} = require('../db')

const router = Router()

router.get('/', async (req, res) => {
    res.json({message: 'estas son las tiendas disponibles'})
})

router.post('/', async (req, res) => {
    const {name, city, address, phoneNumber, openTime, closeTime, pickUpSchedule, deliverySchedule, coordinates} = req.body
    try {
        const newStore = await Store.create({...req.body})
        res.status(200).json(newStore)
    } catch(error) {
        console.error(error)
        res.status(400).json({message: error})
    }
})

module.exports = router