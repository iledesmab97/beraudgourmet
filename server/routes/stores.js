const { Router } = require('express')
const {Store} = require('../db')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const allStores = await Store.findAll()
        res.status(200).json(allStores)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    try {
        const newStore = await Store.create({...req.body})
        res.status(200).json(newStore)
    } catch(error) {
        const {message, parent} = error
        res.status(400).json({message, parent: parent.message})
    }
})

router.delete('/', async (req, res) => {
    const {id} = req.query
    try {
        if (!id) return res.status(300).json({message: 'id can\'t be undefined'})
        const storeToRemove = await Store.findByPk(id)
        if (!storeToRemove) return res.status(200).json({message: `store with id:${id} does not exist`})
        await storeToRemove.destroy()
        res.status(200).json({message: `store with id:${id} had been removed successfully`})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router