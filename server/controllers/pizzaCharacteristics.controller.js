const {PizzaCharacteristic, PizzaMass, PizzaSize} = require('../db')

async function findOrCreatedPizzaCharacteristic(pizzaCharacteristicsData) {
    const { mass, size } = pizzaCharacteristicsData
    try {
        // get mass
        const [massFinded, createdMass] = await PizzaMass.findOrCreate({
            where: {
                name: mass
            },
            default: {
                name: mass
            }
        })
        if (!massFinded) throw new Error('El tipo de masa no fue encontrado')
        
        // get id size
        const [sizeFinded, createdSize] = await PizzaSize.findOrCreate({
            where: {
                size
            },
            default: {
                size
            }
        })
        if (!sizeFinded) throw new Error('El tamaño de la pizza no se ha encontrado')

        // get id pizzaCharacteristics
        const [pizzaCharacteristics, created] = await PizzaCharacteristic.findOrCreate({
            where: {
                PizzaMassId: massFinded.id,
                PizzaSizeId: sizeFinded.id
            },
            default: {
                PizzaMassId: massFinded.id,
                PizzaSizeId: sizeFinded.id
            }
        })
        if (!pizzaCharacteristics) throw new Error('Las caracteristicas de la pizza no se han encontrado')

        return pizzaCharacteristics
    } catch(error) {
        return {message: error.message}
    }
}

async function makePizzaCharacteristics(characteristicsData) {
    const { size, mass } = characteristicsData
    // find or create the mass
    const [ massFinded, createdMass ] = await PizzaMass.findOrCreate({
        where: {
            name: mass
        },
        default: {
            name: mass
        }
    })

    // find or create the size
    const [ sizeFinded, createdSize ] = await PizzaSize.findOrCreate({
        where: {
            size
        },
        default: {
            size
        }
    })

    // create pizza characteristics
    const newPizzaCharacteristic = await PizzaCharacteristic.create({
        PizzaMassId: massFinded.id,
        PizzaSizeId: sizeFinded.id
    })
    return newPizzaCharacteristic
}

async function getPizzaCharacteristics(req, res) {
    try {
        const allPizzaCharacteristics = await PizzaCharacteristic.findAll()
        const allPizzaCharacteristicsWithText = allPizzaCharacteristics.map(async(pizzaCharacteristics) => {
            const { id, cost, PizzaMassId, PizzaSizeId, costIVA } = pizzaCharacteristics
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
                costIVA,
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

async function getPizzaCharacteristicWithData(req, res) {
    const { mass, size } = req.body
    try {
        const pizzaCharacteristic = findOrCreatedPizzaCharacteristic({ mass, size })
        res.status(200).json(pizzaCharacteristic)
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
                // create new pizza characteristics
                const { size, mass } = pizzaCharacteristics
                const newPizzaCharacteristic = await makePizzaCharacteristics({ size, mass })
                return newPizzaCharacteristic
            })

            return Promise.all(newListPizzaCharacteristics)
                .then(result => res.status(200).json(result))
                .catch(error => {throw new Error({message: error.message})})
        }

        const { size, mass } = req.body
        // create new pizza characteristics
        const newPizzaCharacteristic = await makePizzaCharacteristics({ size, mass })

        res.status(200).json(newPizzaCharacteristic)
    } catch(error) {
        const { message } = error
        res.status(400).json({ message })
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
    getPizzaCharacteristics,
    getPizzaCharacteristicWithData,
    addPizzaCharacteristics,
    removePizzaCharacteristics,
    findOrCreatedPizzaCharacteristic
}