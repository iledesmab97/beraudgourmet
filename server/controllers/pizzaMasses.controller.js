const { PizzaMass, PizzaSize } = require('../db')

async function getAllPizzaMasses(req, res) {
    try {
        const allPizzaMasss = await PizzaMass.findAll()
        res.status(200).json(allPizzaMasss)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function makePizzaMass(massData) {
    // Add a mass
    const { name, text, sizes } = massData
    const newPizzaMass = await PizzaMass.create({ name, text })

    // Add sizes to mass
    if (sizes) {
        const sizesId = findSizesId(sizes)

        await newPizzaMass.addPizzaSizes(sizesId)
    }

    return newPizzaMass
}

async function findSizesId(listSizes) {
    return await PizzaSize.findAll({
        attributes: ['id'],
        where: {
            size: listSizes
        }
    }).then(data => data.map( size => size.id ))
}

async function addPizzaMass(req, res) {
    const {many} = req.query
    try {
        if (many && JSON.parse(many)) {
            const newPizzaMass = await PizzaMass.bulkCreate(req.body)
            return res.status(200).json(newPizzaMass)
        }
        const { name, text, sizes } = massData
        const newPizzaMass = makePizzaMass({ name, text, sizes })

        return res.status(200).json(newPizzaMass)
    } catch(error) {
        const {message, parent} = error
        return res.status(400).json({message: message, parent: parent?.message})
    }
}

async function addSizesToPizzaMass(req, res) {
    const { name, sizes } = req.body
    
    try {
        if (!sizes) throw new Error('Necesitas indicar la lista de tamaños')

        const mass = await PizzaMass.findOne({
            attributes: ['id'],
            where: {
                name
            }
        })
        if (!mass) throw new Error('Esta masa no se encuentra ne la base de datos')

        const sizesId = await findSizesId(sizes)

        if (!sizesId.length) throw new Error('Los tamaños indicados no están en la base de datos')

        await mass.addPizzaSizes(sizesId)
        res.status(200).json({ message: 'Los tamaños fueron añadidos exitosamente'})

    } catch(error) {
        res.status(400).json({ message: error.message})
    }
}

async function removePizzaMass(req, res) {
    const {id} = req.query
    try {
        if (!id) return res.status(300).json({message: 'id can\'t be undefined'})
        const pizzaMassToRemove = await PizzaMass.findByPk(id)
        if (!pizzaMassToRemove) return res.status(200).json({message: `pizzaMass with id:${id} does not exist`})
        await pizzaMassToRemove.destroy()
        res.status(200).json({message: `pizzaMass with id:${id} had been removed successfully`})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {
    getAllPizzaMasses,
    addPizzaMass,
    addSizesToPizzaMass,
    removePizzaMass
}