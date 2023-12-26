const { Router } = require('express')
const {PizzaMass} = require('../db')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const allPizzaMasss = await PizzaMass.findAll()
        res.status(200).json(allPizzaMasss)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    const {single} = req.query
    try {
        if (single && JSON.parse(single)) {
            const newPizzaMasss = await PizzaMass.create(req.body)
            return res.status(200).json(newPizzaMasss)    
        }
        const newPizzaMasss = await PizzaMass.bulkCreate(req.body)
        res.status(200).json(newPizzaMasss)
    } catch(error) {
        const {message, parent} = error
        res.status(400).json({message, parent: parent.message})
    }
})

router.delete('/', async (req, res) => {
    const {id} = req.query
    try {
        if (!id) return res.status(300).json({message: 'id can\'t be undefined'})
        const pizzaMassToRemove = await PizzaMass.findByPk(id)
        if (!pizzaMassToRemove) return res.status(200).json({message: `pizzaMass with id:${id} does not exist`})
        await pizzaMassToRemove.destroy()
        res.status(200).json({message: `pizzaMass with id:${id} had been removed successfully`})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router