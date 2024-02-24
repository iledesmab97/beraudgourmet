const {PizzaCost, PizzaCharacteristic, Pizza, PizzaMass, PizzaSize } = require('../db')
const { findOrCreatedPizzaCharacteristic } = require('./pizzaCharacteristics.controller')

async function getAllPizzaCosts(req, res) {
    try {
        const allPizzaCosts = await PizzaCost.findAll()
        const allPizzaCostsWithText = allPizzaCosts.map(async(pizzaCosts) => {
            const { id, cost, costIVA, PizzaId, PizzaCharacteristicId } = pizzaCosts
            // find pizza
            const pizza = await Pizza.findOne({
                attribute: ['name'],
                where: {
                    id: PizzaId
                }
            })
            // find characteristics
            const pizzaCharacteristic = await PizzaCharacteristic.findOne({
                where: {
                    id: PizzaCharacteristicId
                }
            })
            // find mass
            const mass = await PizzaMass.findByPk(pizzaCharacteristic.PizzaMassId)
            // find size 
            const size = await PizzaSize.findByPk(pizzaCharacteristic.PizzaSizeId)

            const pizzaCostsText = {
                id,
                cost,
                costIVA,
                pizza: pizza.name,
                pizzaCharacteristics: {
                    mass: mass.name,
                    size: size.size
                }
            }

            return pizzaCostsText
        })
        return await Promise.all(allPizzaCostsWithText)
            .then(result => res.status(200).json(result))
            .catch(error => {throw new Error({message: error.message})})
        // res.status(200).json(allPizzaCosts)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function makePizzaCost(pizzaCostData) {
    const { cost, pizza, characteristics, pizzaId } = pizzaCostData
    const { mass, size } = characteristics
    
    try {
        // get id of PizzaId
        const PizzaId = pizzaId ? pizzaId : await Pizza.findOne({
            attributes: ['id'],
            where: {
                name: pizza
            }
        }).then(data => data.id)
        if (!PizzaId) throw new Error('Pizza not found')

        // get PizzaCharacteristicId
        const PizzaCharacteristicId = await findOrCreatedPizzaCharacteristic({ mass, size }).then(data => data.id)

        // verify if the costs already exist
        const alreadyExists = await PizzaCost.findOne({
            where: {
                PizzaId,
                PizzaCharacteristicId    
            }
        })
        if (alreadyExists) return `El costo para la pizza ${pizza}, con ${mass} y ${size} ya existe`

        // Create new PizzaCost
        const newPizzaCost = await PizzaCost.create({
            cost,
            PizzaId,
            PizzaCharacteristicId
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
                const { cost, pizza, characteristics } = pizzaCosts
                const newPizzaCost = await makePizzaCost({ cost, pizza, characteristics })
                return newPizzaCost
            })
            return Promise.all(newListPizzaCosts)
                .then(result => res.status(200).json(result))
                .catch(error => {throw new Error({message: error.message})})
        }
        
        // Add a pizzaCost
        const { cost, pizza, characteristics } = req.body
        
        const newPizzaCost = await makePizzaCost({ cost, pizza, characteristics })

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