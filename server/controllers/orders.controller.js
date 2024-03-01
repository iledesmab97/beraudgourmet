const {Order, KindProduct, OrderPizza, ExtraIngredientsxOrderPizza, ItemsxOrder, PizzaCharacteristic, PizzaMass, PizzaSize, PizzaExtraIngredient, PizzaIngredient, Pizza, User, Store, DeliveryInformation } = require('../db')
const { findPizzaCharacteristic } = require('./pizzaCharacteristics.controller')
const { Op } = require('sequelize')

async function findAllOrders({userId}) {
    const orderList = await Order.findAll({
        include: DeliveryInformation,
        where: {
            UserId: userId ? userId : { [Op.ne]: 0}
        }
    })
    return orderList
}

async function getAllOrders(req, res) {
    const { userId } = req.params
    try {
        const allOrders = await findAllOrders({userId})
        const ordersToReturn = allOrders.map(async (order) => {
            const {id, totalCost, applicationDate, deliveryDate, StripeId, paymentMethod, delivery, closed, paid} = order
            // Find the User
            const user = await User.findByPk(order.UserId, {
                attributes: ['id', 'name', 'phoneNumber']
            })
            // Find the Store
            const store = await Store.findByPk(order.StoreId, {
                attributes: ['id', 'name']
            })
            // Find the DeliveryInformation
            const deliveryInformation = await DeliveryInformation.findOne({
                attributes: { exclude: ['OrderId'] },
                where: {
                    OrderId: id
                }
            })
            const newOrder = {
                id,
                totalCost,
                applicationDate,
                deliveryDate,
                StripeId,
                user,
                store,
                paymentMethod,
                delivery,
                closed,
                paid,
                deliveryInformation
            }
            return newOrder
        })
        return Promise.all(ordersToReturn)
            .then(result => res.status(200).json(result))
            .catch(error => {throw new Error({message: error.message})})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function addOrder(req, res) {
    try {
        const { userId, storeId, totalCostByItems, commissions, totalCost, applicationDate, deliveryDate, itemsList, stripeId, paid, closed, delivery, paymentMethod, deliveryInformation } = req.body

        // Creo la nueva Orden
        const newOrder = await Order.create({
            totalCostByItems,
            commissions,
            totalCost,
            applicationDate,
            deliveryDate,
            StoreId: storeId,
            UserId: userId,
            StripeId: stripeId,
            paid,
            closed,
            delivery,
            paymentMethod
        })
        console.log('added new Order successfully')

        // Agrego la información de delivery
        if (deliveryInformation) {
            const { inputAddress, street, city, postalCode, note, type, other } = deliveryInformation
            const { totalName } = type
            const newDeliveryInformation = await DeliveryInformation.create({
                address: inputAddress,
                typeResidence: totalName,
                businessOrBuilding: other ? Object.values(other).join(' / ') : '',
                street: Object.values(street).join(' / '),
                townOrCity: `${city} / ${postalCode}`,
                note
            })
            await newOrder.setDeliveryInformation(newDeliveryInformation.id)
        }

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
    addOrder,
}