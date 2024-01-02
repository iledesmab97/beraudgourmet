const { Router } = require('express')
const {Order, KindProduct, OrderPizza, ExtraIngredientsxOrderPizza, ItemsxOrder, PizzaCharacteristic, PizzaMass, PizzaSize, PizzaExtraIngredient, PizzaIngredient, Pizza } = require('../db')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const allOrders = await Order.findAll()
        res.status(200).json(allOrders)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    try {

        const { userId, storeId, totalCostByItems, commissions, totalCost, applicationDate, deliveryDate, itemsList } = req.body

        // Creo la nueva Orden
        const newOrder = await Order.create({totalCostByItems, commissions, totalCost, applicationDate, deliveryDate, StoreId: storeId, UserId: userId})

        // Creo las nuevas Ordenes para los articulos de la orden general
        for (let item of itemsList) {
            const { name, itemType, quantity } = item
            switch (name) {
                case 'pizza': {
                    const { size, mass, ingredientsOut, extraIngredients, costItemPerUnit, totalCostByItem } = item
                    const pizzaId = await Pizza.findOne({
                        attributes: ['id'],
                        where: {
                            name: itemType
                        }
                    })
    
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
                        idCharacteristicsPizza: pizzaCharacteristicsId.id,
                        quantity,
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
                        for (let i=0; i < extraIngredients.length; i++) {
                            const {id, cost} = extraIngredientsList[i]
                            const {quantity} = extraIngredients[i]
                            await newOrderPizza.addPizzaExtraIngredient(id, {
                                through: {
                                    quantity,
                                    cost: cost * quantity
                                }
                            })
                        }
                    }

                    // Añado la información a la tabla de ItemsxOrder

                    const newItemxOrder = await ItemsxOrder.create({
                        quantity,
                        costPerUnity: costItemPerUnit,
                        totalCostByItem,
                        OrderItemId: newOrderPizza.id
                    })
                    await newItemxOrder.setOrder(newOrder.id)
                    await newItemxOrder.setKindProduct({})

                }
                default: {
                    continue
                }
            }

        }
        
        return res.status(200).json(newOrder)
    } catch(error) {
        const {message, parent} = error
        return res.status(400).json({message, parent: parent?.message})
    }
})

router.delete('/', async (req, res) => {
    const {id} = req.query
    try {
        if (!id) return res.status(300).json({message: 'id can\'t be undefined'})
        const orderToRemove = await Order.findByPk(id)
        if (!orderToRemove) return res.status(200).json({message: `order with id:${id} does not exist`})
        await orderToRemove.destroy()
        res.status(200).json({message: `order with id:${id} had been removed successfully`})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router