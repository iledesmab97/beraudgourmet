const { Router } = require('express')
const {PizzaSize} = require('../db')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const allPizzaSizes = await PizzaSize.findAll()
        res.status(200).json(allPizzaSizes)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    const {many} = req.query
    const {body} = req
    try {
        if (many && JSON.parse(many)) {
            if (!Array.isArray(body)) throw new Error('the body need to be a array')
            const newPizzaSizes = await PizzaSize.bulkCreate(body)
            console.log('the list of pizzas sizes has been created')
            return res.status(200).json(newPizzaSizes)    
        }
        if (!body || Array.isArray(body)) throw new Error('the body need to be a object')
        const newPizzaSizes = await PizzaSize.create(body)
        console.log('the pizza size has been created')
        res.status(200).json(newPizzaSizes)
    } catch(error) {
        const {message, parent} = error
        res.status(400).json({message, parent: parent ? parent.message : undefined})
    }
})

router.delete('/', async (req, res) => {
    const {id} = req.query
    try {
        if (!id) throw new Error('id can\'t be undefined')
        const pizzaSizeToRemove = await PizzaSize.findByPk(id)
        if (!pizzaSizeToRemove) return res.status(200).json({message: `pizzaSize with id:${id} does not exist`})
        await pizzaSizeToRemove.destroy()
        res.status(200).json({message: `pizzaSize with id:${id} had been removed successfully`})
    } catch(error) {
        const {message, parent} = error
        res.status(400).json({message, parent: parent ? parent.message : undefined})
    }
})

module.exports = router