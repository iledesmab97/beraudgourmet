const {PizzaMass} = require('../db')

async function getAllPizzaMasses(req, res) {
    try {
        const allPizzaMasss = await PizzaMass.findAll()
        res.status(200).json(allPizzaMasss)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function addPizzaMass(req, res) {
    const {many} = req.query
    try {
        if (many && JSON.parse(many)) {
            const newPizzaMasss = await PizzaMass.bulkCreate(req.body)
            return res.status(200).json(newPizzaMasss)
        }
        const newPizzaMasss = await PizzaMass.create(req.body)
        return res.status(200).json(newPizzaMasss)
    } catch(error) {
        const {message, parent} = error
        return res.status(400).json({message: message, parent: parent?.message})
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
    removePizzaMass
}