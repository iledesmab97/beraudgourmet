const { Pizza, PizzaIngredient, PizzaCost } = require('../db')
const { findOrCreatedPizzaCharacteristic } = require('./pizzaCharacteristics.controller')
const { makePizzaCost } = require('./pizzaCosts.controller')

async function getAllPizzas (req, res) {
    try {
        // Buscar todas las pizzas con sus ingredientes
        const allPizzas = await Pizza.findAll({
            include: PizzaIngredient
        })

        // Modificar la estructura del objeto resultante
        const pizzaList = allPizzas.map(pizza => {
            const { id, name, text, image, PizzaIngredients } = pizza
            const ingredients = PizzaIngredients.map(ingredient => ingredient.name)
            return {
                id,
                name,
                text,
                image,
                ingredients
            }
        })
        res.status(200).json(pizzaList)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function makePizza(body) {
    const { name, text, image, ingredients, costs } = body
    const newPizza = await Pizza.create({ name, text, image })    
    
    //Add ingredients to new pizza
    if (ingredients) {
        for (let ingredient of ingredients) {
            const [ingredientsSelected, created] = await PizzaIngredient.findOrCreate({
                attributes: ['id'],
                where: {
                    name: ingredient
                },
                defaults: {}
            })
            await newPizza.addPizzaIngredient([ingredientsSelected.id])
        }
    }

    //Add costs to new pizza
    if (costs) {
        for (let pizzaCost of costs) {
            const { mass, size, cost } = pizzaCost
            const newPizzaCost = await makePizzaCost({ cost, pizza: newPizza.name, characteristics: { mass, size}, pizza: newPizza })
        }
    }
    return newPizza
}

async function addPizzas(req, res) {
    const {many} = req.query
    try {
        // Add many pizzas
        if (many && JSON.parse(many)) {
            const pizzas = req.body
            const newPizzas = pizzas.map( async (pizza) => {
                const newPizza = await makePizza(pizza)
                return newPizza
            })
            return await Promise.all(newPizzas)
                .then(result => res.status(200).json(result))
                .catch(error => {throw new Error({message: error.message})})
        }
        // Add a pizza
        const newPizza = await makePizza({...req.body})
        res.status(200).json(newPizza)
    } catch(error) {
        const {message, parent} = error
        res.status(400).json({message, parent: parent?.message})
    }
}

async function removePizza(req, res) {
    const {id} = req.query
    try {
        if (!id) return res.status(300).json({message: 'id can\'t be undefined'})
        const pizzaToRemove = await Pizza.findByPk(id)
        if (!pizzaToRemove) return res.status(200).json({message: `pizza with id:${id} does not exist`})
        await pizzaToRemove.destroy()
        res.status(200).json({message: `pizza with id:${id} had been removed successfully`})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {
    getAllPizzas,
    addPizzas,
    removePizza
}