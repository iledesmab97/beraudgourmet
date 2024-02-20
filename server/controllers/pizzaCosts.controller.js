const {PizzaCost, PizzaCharacteristic, Pizza, PizzaMass, PizzaSize } = require('../db')
const { findOrCreatedPizzaCharacteristic } = require('./pizzaCharacteristics.controller')

async function getAllPizzaCosts(req, res) {
    try {
        const allPizzaCosts = await PizzaCost.findAll()
        // const allPizzaCostsWithText = allPizzaCosts.map(async(pizzaCosts) => {
        //     const { id, cost, PizzaMassId, PizzaSizeId, costIVA } = pizzaCosts
        //     const massName = await PizzaMass.findOne({
        //         attribute: ['name'],
        //         where: {
        //             id: PizzaMassId
        //         }
        //     })
        //     const sizeName = await PizzaSize.findOne({
        //         attribute: ['size'],
        //         where: {
        //             id: PizzaSizeId
        //         }
        //     })
        //     const pizzaCostsText = {
        //         id,
        //         cost,
        //         costIVA,
        //         pizzaSize: sizeName.size,
        //         pizzaMass: massName.name
        //     }
        //     return pizzaCostsText
        // })
        // return Promise.all(allPizzaCostsWithText)
        //     .then(result => res.status(200).json(result))
        //     .catch(error => {throw new Error({message: error.message})})
        res.status(200).json(allPizzaCosts)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function makePizzaCost(pizzaCostData) {
    const { cost, pizza, characteristics } = pizzaCostData
    const { mass, size } = characteristics
    
    try {
        // get id of PizzaId
        const PizzaId = await Pizza.findOne({
            attributes: ['id'],
            where: {
                name: pizza
            }
        }).then(data => data.id)
        if (!PizzaId) throw new Error('Pizza not found')

        // get PizzaCharacteristicId
        const PizzaCharacteristicId = await findOrCreatedPizzaCharacteristic({ mass, size }).then(data => data.id)

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
        // if (many && JSON.parse(many)) {
        //     const listPizzaCosts = req.body
        //     const newListPizzaCosts = listPizzaCosts.map(async (pizzaCosts) => {
        //         const { sizeId, masaTypeId, cost } = pizzaCosts
        //         const newPizzaCosts = await PizzaCost.create({
        //             cost,
        //             costIVA: cost,
        //             sizeId,
        //             masaTypeId
        //         })
        //         if (masaTypeId && sizeId) {
        //             await newPizzaCosts.setPizzaMass(masaTypeId)
        //             await newPizzaCosts.setPizzaSize(sizeId)
        //         }
        //         return newPizzaCosts
        //     })
        //     return Promise.all(newListPizzaCosts)
        //         .then(result => res.status(200).json(result))
        //         .catch(error => {throw new Error({message: error.message})})
        // }
        
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