const {PizzaCost, PizzaCharacteristic, Pizza, PizzaMass, PizzaSize } = require('../db')
const { findOrCreatedPizzaCharacteristic } = require('./pizzaCharacteristics.controller')

async function getAllPizzaCosts(req, res) {
    try {
        const allPizzaCosts = await PizzaCost.findAll()
        const allPizzaCostsWithText = allPizzaCosts.map(async(pizzaCosts) => {
            const { id, cost, costIVA, PizzaId, PizzaCharacteristicId } = pizzaCosts

            const pizza = await Pizza.findByPk(PizzaId)
            const pizzaCharacteristic = await PizzaCharacteristic.findByPk(PizzaCharacteristicId)
                        
            const size = await PizzaSize.findByPk(pizzaCharacteristic.PizzaSizeId)
            const mass = await PizzaMass.findByPk(pizzaCharacteristic.PizzaMassId)

            const pizzaCostsText = {
                id,
                cost,
                costIVA,
                pizza: pizza.name,
                pizzaCharacteristic: {
                    mass: mass.name,
                    size: size.size
                }
            }
            
            return pizzaCostsText
        })
        return await Promise.all(allPizzaCostsWithText)
            .then(result => res.status(200).json(result))
            .catch(error => {throw new Error({message: error.message})})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function makePizzaCost(pizzaCostData) {
    const { cost, pizzaName, characteristics, pizza } = pizzaCostData
    const { mass, size } = characteristics
    try {
        // get id of PizzaId
        const PizzaObject = pizza ? pizza : await Pizza.findOne({
            where: {
                name: pizzaName
            }
        })
        if (!PizzaObject) throw new Error('Pizza not found')

        // get PizzaCharacteristicId
        const PizzaCharacteristic = await findOrCreatedPizzaCharacteristic({ mass, size })

        // Create new PizzaCost
        // await PizzaObject.addPizzaCharacteristic(PizzaCharacteristicId.id, {
        //     through: {
        //         cost
        //     }
        // })

        const newPizzaCost = await PizzaCost.create({
            cost,
            PizzaId: PizzaObject.id,
            PizzaCharacteristicId: PizzaCharacteristic.id
        })

        return newPizzaCost

    } catch (error) {
        return {message: error.message}
    }
}

async function addPizzaCosts(req, res) {
    const { many } = req.query
    try {
        // Add many PizzaCotst
        if (many && JSON.parse(many)) {
            const listPizzaCosts = req.body
            const newListPizzaCosts = listPizzaCosts.map(async (pizzaCosts) => {
                const { cost, pizzaName, characteristics } = pizzaCosts
                const newPizzaCost = await makePizzaCost({ cost, pizzaName, characteristics })
                return newPizzaCost
            })
            return Promise.all(newListPizzaCosts)
                .then(result => res.status(200).json(result))
                .catch(error => {throw new Error({message: error.message})})
        }
        
        // Add a pizzaCost
        const { cost, pizzaName, characteristics } = req.body
        const newPizzaCost = await makePizzaCost({ cost, pizzaName, characteristics })

        res.status(200).json(newPizzaCost)
    } catch(error) {
        const {message, parent} = error
        res.status(400).json({message, parent: parent?.message})
    }
}

async function removePizzaCosts(req, res) {
    const {id} = req.query
    try {
        if (!id) return res.status(300).json({message: 'id can\'t be undefined'})
        const pizzaCostToRemove = await PizzaCost.findByPk(id)
        if (!pizzaCostToRemove) return res.status(200).json({message: `pizzaCost with id:${id} does not exist`})
        await pizzaCostToRemove.destroy()
        res.status(200).json({message: `pizzaCost with id:${id} had been removed successfully`})
    } catch(error) {
        res.status(400).json({message: error?.message})
    }
}

module.exports = {
    getAllPizzaCosts,
    addPizzaCosts,
    removePizzaCosts,
    makePizzaCost
}