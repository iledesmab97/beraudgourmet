const {PizzaCharacteristic, PizzaMass, PizzaSize} = require('../db')

async function getAllPizzaCharacteristics(req, res) {
    try {
        const allPizzaCharacteristics = await PizzaCharacteristic.findAll()
        const allPizzaCharacteristicsWithText = allPizzaCharacteristics.map(async(pizzaCharacteristics) => {
            const { id, cost, PizzaMassId, PizzaSizeId } = pizzaCharacteristics
            const massName = await PizzaMass.findOne({
                attribute: ['name'],
                where: {
                    id: PizzaMassId
                }
            })
            const sizeName = await PizzaSize.findOne({
                attribute: ['size'],
                where: {
                    id: PizzaSizeId
                }
            })
            const pizzaCharacteristicsText = {
                id,
                cost,
                pizzaSize: sizeName.size,
                pizzaMass: massName.name
            }
            return pizzaCharacteristicsText
        })
        return Promise.all(allPizzaCharacteristicsWithText)
            .then(result => res.status(200).json(result))
            .catch(error => {throw new Error({message: error.message})})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function addPizzaCharacteristics(req, res) {
    const { many } = req.query
    try {
        if (many && JSON.parse(many)) {
            const listPizzaCharacteristics = req.body
            const newListPizzaCharacteristics = listPizzaCharacteristics.map(async (pizzaCharacteristics) => {
                const { sizeId, masaTypeId, cost } = pizzaCharacteristics
                const newPizzaCharacteristics = await PizzaCharacteristic.create({
                    cost,
                    costIVA: cost,
                    sizeId,
                    masaTypeId
                })
                if (masaTypeId && sizeId) {
                    await newPizzaCharacteristics.setPizzaMass(masaTypeId)
                    await newPizzaCharacteristics.setPizzaSize(sizeId)
                }
                return newPizzaCharacteristics
            })
            return Promise.all(newListPizzaCharacteristics)
                .then(result => res.status(200).json(result))
                .catch(error => {throw new Error({message: error.message})})
        }

        const { sizeId, masaTypeId, cost} = req.body
        console.log('cost:', cost)
        const newPizzaCharacteristic = await PizzaCharacteristic.create({
            cost,
            costIVA: cost,
            sizeId,
            masaTypeId
        })
        await newPizzaCharacteristic.setPizzaSize(sizeId)
        await newPizzaCharacteristic.setPizzaMass(masaTypeId)
        res.status(200).json(newPizzaCharacteristic)
    } catch(error) {
        const {message, parent} = error
        res.status(400).json({message, parent: parent?.message})
    }
}

async function removePizzaCharacteristics(req, res) {
    const {id} = req.query
    try {
        if (!id) return res.status(300).json({message: 'id can\'t be undefined'})
        const pizzaCharacteristicToRemove = await PizzaCharacteristic.findByPk(id)
        if (!pizzaCharacteristicToRemove) return res.status(200).json({message: `pizzaCharacteristic with id:${id} does not exist`})
        await pizzaCharacteristicToRemove.destroy()
        res.status(200).json({message: `pizzaCharacteristic with id:${id} had been removed successfully`})
    } catch(error) {
        res.status(400).json({message: error?.message})
    }
}

module.exports = {
    getAllPizzaCharacteristics,
    addPizzaCharacteristics,
    removePizzaCharacteristics
}