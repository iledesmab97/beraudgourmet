const { Router } = require('express')
const { OrderPizza, Pizza, PizzaCharacteristic, PizzaMass, PizzaSize, PizzaExtraIngredient, PizzaIngredient } = require('../db')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const allOrderPizzas = await OrderPizza.findAll()
        res.status(200).json(allOrderPizzas)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    try {
        const {pizza, characteristicsPizza, orderId, ingredientsOut, extraIngredients} = req.body
        const pizzaId = await Pizza.findOne({
            attributes: ['id'],
            where: {
                name: pizza
            }
        })

        const [size, mass] = characteristicsPizza.split('-')
        const pizzaSizeId = await PizzaSize.findOne({
            attributes: ['id'],
            where: {
                size: size
            }
        })

        const pizzaMassId = await PizzaMass.findOne({
            attributes: ['id'],
            where: {
                name: mass
            }
        })

        const pizzaCharacteristicsId = await PizzaCharacteristic.findOne({
            attributes: ['id', 'cost'],
            where: {
                PizzaMassId: pizzaMassId.id,
                PizzaSizeId: pizzaSizeId.id
            }
        })

        const newOrderPizza = await OrderPizza.create({
            cost: pizzaCharacteristicsId.cost,
            idCharacteristicsPizza: pizzaCharacteristicsId.id,
            idPizza: pizzaId.id
        })

        if (ingredientsOut) {
            for (let ingredient of ingredientsOut) {
                const [ingredientsSelected, created] = await PizzaIngredient.findOrCreate({
                    attributes: ['id'],
                    where: {
                        name: ingredient
                    },
                    defaults: {}
                })
                newOrderPizza.addPizzaIngredient([ingredientsSelected.id])
            }
        }

        if (extraIngredients) {
            const extraIngredientsListName = extraIngredients.map(ingredient => ingredient.name)
            const extraIngredientsList = await PizzaExtraIngredient.findAll({
                where: {
                    name: extraIngredientsListName
                }
            })
            await Promise.all(extraIngredients.map((ingredient, index) => {
                const {id, cost} = extraIngredientsList[index]
                const {quantity} = ingredient
                return newOrderPizza.addPizzaExtraIngredient(id, {
                    through: {
                        quantity,
                        cost: cost * quantity
                    }
                })
            }))
        }

        return res.status(200).json(newOrderPizza)
    } catch(error) {
        const {message, parent} = error
        return res.status(400).json({message, parent: parent?.message})
    }
})

router.delete('/', async (req, res) => {
    const {id} = req.query
    try {
        if (!id) return res.status(300).json({message: 'id can\'t be undefined'})
        const orderPizzaToRemove = await OrderPizza.findByPk(id)
        if (!orderPizzaToRemove) return res.status(200).json({message: `orderPizza with id:${id} does not exist`})
        await orderPizzaToRemove.destroy()
        res.status(200).json({message: `orderPizza with id:${id} had been removed successfully`})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router