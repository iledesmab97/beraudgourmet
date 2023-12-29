const { Router } = require('express')
const {KindProduct} = require('../db')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const allKindProducts = await KindProduct.findAll()
        res.status(200).json(allKindProducts)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    const {many} = req.query
    const {body} = req
    try {
        if (many && JSON.parse(many)) {
            if (!Array.isArray(body)) throw new Error('the body need to be a array')
            const newKindProducts = await KindProduct.bulkCreate(body)
            console.log('the list of kind products has been created')
            return res.status(200).json(newKindProducts)    
        }
        if (!body || Array.isArray(body)) throw new Error('the body need to be a object')
        const newKindProduct = await KindProduct.create(body)
        res.status(200).json(newKindProduct)
    } catch(error) {
        const {message, parent} = error
        res.status(400).json({message, parent: parent ? parent.message : undefined})
    }
})

router.delete('/', async (req, res) => {
    const {id} = req.query
    try {
        if (!id) return res.status(300).json({message: 'id can\'t be undefined'})
        const kindProductToRemove = await KindProduct.findByPk(id)
        if (!kindProductToRemove) return res.status(200).json({message: `kindProduct with id:${id} does not exist`})
        await kindProductToRemove.destroy()
        res.status(200).json({message: `kindProduct with id:${id} had been removed successfully`})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router