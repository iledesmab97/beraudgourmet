const {PizzaExtraIngredient} = require('../db')

async function getAllPizzaExtraIngredients(req, res) {
    try {
        const allPizzaExtraIngredients = await PizzaExtraIngredient.findAll()
        res.status(200).json(allPizzaExtraIngredients)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function addPizzaExtraIngredients(req, res) {
    const { many } = req.query
    try {
        if (many && JSON.parse(many)) {
            const newPizzaExtraIngredients = await PizzaExtraIngredient.bulkCreate(req.body)
            return res.status(200).json(newPizzaExtraIngredients)
        }
        const newPizzaExtraIngredient = await PizzaExtraIngredient.create({...req.body})
        res.status(200).json(newPizzaExtraIngredient)
    } catch(error) {
        const {message, parent} = error
        res.status(400).json({message, parent: parent?.message})
    }
}

async function removePizzaExtraIngredients(req, res) {
    const {id} = req.query
    try {
        if (!id) return res.status(300).json({message: 'id can\'t be undefined'})
        const pizzaExtraIngredientToRemove = await PizzaExtraIngredient.findByPk(id)
        if (!pizzaExtraIngredientToRemove) return res.status(200).json({message: `pizzaExtraIngredient with id:${id} does not exist`})
        await pizzaExtraIngredientToRemove.destroy()
        res.status(200).json({message: `pizzaExtraIngredient with id:${id} had been removed successfully`})
    } catch(error) {
        res.status(400).json({message: error?.message})
    }
}

module.exports={
    getAllPizzaExtraIngredients,
    addPizzaExtraIngredients,
    removePizzaExtraIngredients
}