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

        const { userId, storeId, totalCostByItems, commissions, totalCost, applicationDate, deliveryDate, itemsList, stripeId } = req.body

        // Creo la nueva Orden
        const newOrder = await Order.create({
            totalCostByItems,
            commissions,
            totalCost,
            applicationDate,
            deliveryDate,
            StoreId: storeId,
            UserId: userId,
            StripeId: stripeId
        })
        console.log('added new Order successfully')

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
                    console.log('added new OrderPizza successfully')
    
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
                    console.log('added ingredietsOut to OrderPizza successfully')
    
                    if (extraIngredients) {
                        const extraIngredientsListName = extraIngredients.map(ingredient => ingredient.name)
                        const extraIngredientsList = await PizzaExtraIngredient.findAll({
                            where: {
                                name: extraIngredientsListName
                            }
                        })
                        for (let i=0; i < extraIngredientsList.length; i++) {
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
                    console.log('added extraIngredients to OrderPizza successfully')

                    // Añado la información a la tabla de ItemsxOrder

                    const newItemxOrder = await ItemsxOrder.create({
                        quantity,
                        costPerUnity: costItemPerUnit,
                        totalCostByItem,
                        OrderItemId: newOrderPizza.id
                    })
                    await newItemxOrder.setOrder(newOrder.id)
                    await newItemxOrder.setKindProduct(1)
                    console.log('added new ItemsxOrder successfully')
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