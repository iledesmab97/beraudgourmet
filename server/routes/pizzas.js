require('dotenv').config({ path: '.env.local'})
const { Router } = require('express')
const { Op } = require('sequelize')
const {Pizza, PizzaIngredient, PizzaCharacteristic} = require('../db')
const multer = require('multer')
const {v2} = require('cloudinary')

const {CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET} = process.env

const upload = multer({ storage: multer.memoryStorage() })

v2.config({ 
    cloud_name: CLOUD_NAME, 
    api_key: CLOUD_API_KEY, 
    api_secret: CLOUD_API_SECRET 
})

const router = Router()

router.get('/', async (req, res) => {
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
})

router.post('/', async (req, res) => {
    const {many} = req.query
    try {
        if (many && JSON.parse(many)) {
            const pizzas = req.body
            const newPizzas = pizzas.map( async (pizza) => {
                const newPizza = await Pizza.create(pizza)
                const {ingredients} = pizza
                if (ingredients) {
                    for (let ingredient of ingredients) {
                        const [ingredientsSelected, created] = await PizzaIngredient.findOrCreate({
                            attributes: ['id'],
                            where: {
                                name: ingredient
                            },
                            defaults: {}
                        })
                        newPizza.addPizzaIngredient([ingredientsSelected.id])
                    }
                }
                
                return newPizza
            })
            return Promise.all(newPizzas)
                .then(result => res.status(200).json(result))
                .catch(error => {throw new Error({message: error.message})})
        }

        const newPizza = await Pizza.create({...req.body})
        
        const {ingredients} = req.body
        if (ingredients) {
            for (let ingredient of ingredients) {
                const [ingredientsSelected, created] = await PizzaIngredient.findOrCreate({
                    attributes: ['id'],
                    where: {
                        name: ingredient
                    },
                    defaults: {}
                })
                newPizza.addPizzaIngredient([ingredientsSelected.id])
            }
        }
        
        res.status(200).json(newPizza)
    } catch(error) {
        const {message, parent} = error
        res.status(400).json({message, parent: parent.message})
    }
})

router.post('/image', upload.single('file'), async (req, res) => {
    try {
        const image = req.file.buffer
        const response = await new Promise((resolve, reject) => {
            v2.uploader.upload_stream({}, (err, result) => {
                if (err) reject(err)
                resolve(result)
            }).end(image)
        })
        console.log('response:', response)
        res.status(200).json({message: 'Imagen subida exitosamente', url: response.secure_url})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.delete('/', async (req, res) => {
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
})

module.exports = router