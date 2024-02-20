const {PizzaCost, PizzaCharacteristic, Pizza, PizzaMass, PizzaSize } = require('../db')

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
    const { cost, name, characteristics } = pizzaCostData
    
    try {
        // get id of Pizza
        const PizzaId = await Pizza.findOne({
            attributes: ['id'],
            where: {
                name
            }
        }).then(data => data.id)
        if (!PizzaId) throw new Error('Pizza not found')

        const { masaType, size } = characteristics

        // get id masaType
        const PizzaMassId = await PizzaMass.findOne({
            attributes: ['id'],
            where: {
                name: masaType
            }
        }).then(data => data.id)
        if (!PizzaMassId) throw new Error('Mass not found')
        
        // get id size
        const PizzaSizeId = await PizzaSize.findOne({
            attributes: ['id'],
            where: {
                size: size
            }
        }).then(data => data.id)
        if (!PizzaSizeId) throw new Error('Size not found')

        // get id PizzaCharacteristic
        const pizzaCharacteristicsId = await PizzaCharacteristic.findOne({
            attributes: ['id'],
            where: {
                PizzaMassId,
                PizzaSizeId
            }
        }).then(data => data.id)
        if(!pizzaCharacteristicsId) throw new Error('PizzaCharacteristic not found')

        // Create new PizzaCost
        const newPizzaCost = await PizzaCost.create({
            cost
        })

        // add pizza, mass and size
        await newPizzaCost.setPizzaCharacteristic(pizzaCharacteristicsId)
        await newPizzaCost.setPizza(PizzaId)

        return newPizzaCost

    } catch (error) {
        const { message } = error
        res.status(400).json({ message })
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
        const { cost, name, characteristics } = req.body
        
        const newPizzaCost = await makePizzaCost({ cost, name, characteristics })

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
    removePizzaCosts
}