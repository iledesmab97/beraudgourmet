const { Router } = require('express')
const {PizzaCharacteristic, PizzaMass, PizzaSize} = require('../db')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const allPizzaCharacteristics = await PizzaCharacteristic.findAll()
        res.status(200).json(allPizzaCharacteristics)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    const { many } = req.query
    try {
        if (many && JSON.parse(many)) {
            const listPizzaCharacteristics = req.body
            const newListPizzaCharacteristics = listPizzaCharacteristics.map(async (pizzaCharacteristics) => {
                const newPizzaCharacteristics = await PizzaCharacteristic.create(pizzaCharacteristics)
                const {PizzaMassId, PizzaSizeId} = pizzaCharacteristics
                if (PizzaMassId && PizzaSizeId) {
                    await newPizzaCharacteristics.setPizzaMass(PizzaMassId)
                    await newPizzaCharacteristics.setPizzaSize(PizzaSizeId)
                    return newPizzaCharacteristics
                } else {
                    console.log('entre en el else')
                }
            })
            return Promise.all(newListPizzaCharacteristics)
                .then(result => res.status(200).json(result))
                .catch(error => {throw new Error({message: error.message})})
        }


        const { sizeId, masaTypeId} = req.body
        const newPizzaCharacteristic = await PizzaCharacteristic.create({...req.body})
        await newPizzaCharacteristic.setPizzaSize(sizeId)
        await newPizzaCharacteristic.setPizzaMass(masaTypeId)
        res.status(200).json(newPizzaCharacteristic)
    } catch(error) {
        const {message, parent} = error
        res.status(400).json({message, parent: parent.message})
    }
})

router.delete('/', async (req, res) => {
    const {id} = req.query
    try {
        if (!id) return res.status(300).json({message: 'id can\'t be undefined'})
        const pizzaCharacteristicToRemove = await PizzaCharacteristic.findByPk(id)
        if (!pizzaCharacteristicToRemove) return res.status(200).json({message: `pizzaCharacteristic with id:${id} does not exist`})
        await pizzaCharacteristicToRemove.destroy()
        res.status(200).json({message: `pizzaCharacteristic with id:${id} had been removed successfully`})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router