const {Order, KindProduct, OrderPizza, ExtraIngredientsxOrderPizza, ItemsxOrder, PizzaCharacteristic, PizzaMass, PizzaSize, PizzaExtraIngredient, PizzaIngredient, Pizza } = require('../db')
const { findPizzaCharacteristic } = require('./pizzaCharacteristics.controller')

async function getAllOrders(req, res) {
    try {
        const allOrders = await Order.findAll()
        res.status(200).json(allOrders)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function addOrder(req, res) {
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
            switch (itemType) {
                case 'pizza': {
                    const { size, mass, ingredientsOut, extraIngredients, costItemPerUnit, totalCostByItem } = item
                    
                    // Find pizza
                    const pizza = await Pizza.findOne({
                        where: {
                            name
                        }
                    })

                    // find pizza characteristics
                    const pizzaCharacteristics = await findPizzaCharacteristic({ size, mass })

                    // add order pizza
                    const newOrderPizza = await OrderPizza.create({
                        idCharacteristicsPizza: pizzaCharacteristics.id,
                        quantity,
                        idPizza: pizza.id
                    })
                    console.log('added new OrderPizza successfully')
    
                    // add ingredients out
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
    
                    // add extra ingredients
                    if (extraIngredients) {
                        const extraIngredientsListName = extraIngredients.map(ingredient => ingredient.name)
                        const extraIngredientsList = await PizzaExtraIngredient.findAll({
                            where: {
                                name: extraIngredientsListName
                            }
                        })
                        for (let i=0; i < extraIngredientsList.length; i++) {
                            const { id, cost } = extraIngredientsList[i]
                            const { quantity } = extraIngredients[i]
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
}

module.exports = {
    getAllOrders,
    addOrder
}