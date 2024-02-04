const { PizzaIngredient } = require('../db')

async function getAllPizzaIngredients (req, res) {
    try {
        const allPizzaIngredients = await PizzaIngredient.findAll()
        return res.status(200).json(allPizzaIngredients)
    } catch(error) {
        return res.status(400).json({message: error.message})
    }
}

async function makePizzaIngredient(body) {
    if (!body || Array.isArray(body)) throw new Error('the body need to be a object')
    const {name} = body
    if (!name) throw new Error('name cannot be undefined')
    const ingredientAlreadyCreated = await PizzaIngredient.findOne({
        where: {
            name: [name]
        }
    })
    if (ingredientAlreadyCreated) throw new Error('the pizza ingredients already exists')
    const newPizzaIngredients = await PizzaIngredient.create(body)
    return newPizzaIngredients
}

async function addPizzaIngredients(req, res) {
    const {many} = req.query
    const { body } = req
    try {
        // Add many ingredients
        if (many && JSON.parse(many)) {
            if (!Array.isArray(body)) throw new Error('the body need to be a array')
            const pizzaIngredientAlreadyCreated = await PizzaIngredient.findAll({
                where: {
                    name: body.map(ingredient => ingredient.name)
                }
            })
            const listIngredientsNameAlreadyCreated = pizzaIngredientAlreadyCreated.map( ingredient => ingredient.name)
            const pizzaIngredientsToCreate = body.filter(ingredient => {
                return !listIngredientsNameAlreadyCreated.includes(ingredient.name)
            } )
            const newPizzaIngredients = await PizzaIngredient.bulkCreate(pizzaIngredientsToCreate)
            console.log('the list of pizzas ingredients has been created')
            return res.status(200).json(newPizzaIngredients)    
        }
        const newPizzaIngredients = await makePizzaIngredient(body)
        console.log('the pizza ingredient has been created successfully')
        return res.status(200).json(newPizzaIngredients)
    } catch(error) {
        const {message, parent} = error
        return res.status(400).json({message, parent: parent ? parent.message : undefined})
    }
}

async function removePizzaIngredients(req, res) {
    const {id} = req.query
    try {
        if (!id) return res.status(300).json({message: 'id can\'t be undefined'})
        const pizzaIngredientToRemove = await PizzaIngredient.findByPk(id)
        if (!pizzaIngredientToRemove) return res.status(200).json({message: `pizzaIngredient with id:${id} does not exist`})
        await pizzaIngredientToRemove.destroy()
        res.status(200).json({message: `pizzaIngredient with id:${id} had been removed successfully`})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {
    getAllPizzaIngredients,
    makePizzaIngredient,
    addPizzaIngredients,
    removePizzaIngredients
}