const { Router } = require('express')
const {Order, KindProduct, OrderPizza, ExtraIngredientsxOrderPizza, ItemsxOrder} = require('../db')

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
        const {storeId, userId, itemsList, cost, applicationDate, deliveryDate } = req.body
        if (!itemsList || !Array.isArray(itemsList)) throw new Error('itemsList need to be a array')
        if (!cost || !Number(cost) || Number(cost) < 0) throw new Error('the cost cannot be null, less or equal than zero')

        // Buscar los id de los tipos de productos
        const listKindProductsName = itemsList.map(item => item.typeItem)
        const listKindProducts = await Promise.all(listKindProductsName.map(async (name)=> {
            return await KindProduct.findOne({
                where: {
                    name
                }
            })
        }))

        // Buscar todas las ordenes de pizza creadas y pertenecientes a la orden general
        const orderPizzaList = itemsList.map(item => item.orderItemId)
        const itemsOrderList = await OrderPizza.findAll({
            where: {
                id: orderPizzaList
            }
        })

        const listExtraIngredientsByItemsOrder = await Promise.all(itemsOrderList.map((itemOrder, index) => {
            const { id } = itemOrder
            return ExtraIngredientsxOrderPizza.findAll({
                attributes: ['cost', 'OrderPizzaId'],
                where: {
                OrderPizzaId: id
                }
            })
        }))

        const dataByItemsOrder = listExtraIngredientsByItemsOrder.map((extraIngredientByItemOrder, index) => {
            const { quantity } = itemsList[index]
            const { id, cost } = itemsOrderList[index]
            const totalExtraCost = extraIngredientByItemOrder.reduce((acc, curr) => acc + Number(curr.cost), 0)
            const totalCost = (Number(cost) + totalExtraCost) * quantity

            return {
                id,
                quantity,
                totalCost
            }
        })

        const newOrder = await Order.create({cost, applicationDate, deliveryDate, StoreId: storeId, UserId: userId})

        await Promise.all(dataByItemsOrder.map( async (itemOrder, index) => {
            const { quantity, totalCost, id } = itemOrder
            const idKindProduct = listKindProducts[index].id
            const newItemOrder = await ItemsxOrder.create({
                quantity,
                cost: totalCost,
                OrderItemId: id,
            })
            await newItemOrder.setOrder(newOrder.id)
            await newItemOrder.setKindProduct(idKindProduct)
        }))

        console.log('Se han modificado los parametros de la orden exitosamente')
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