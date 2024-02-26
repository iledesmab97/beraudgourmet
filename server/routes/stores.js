const { Router } = require('express')

const { getAllStores, addStores, removeStore, updateStore } = require('../controllers/stores.controller')

const router = Router()

router.get('/', getAllStores)

router.post('/', addStores)

router.put('/:id', updateStore)

router.delete('/', removeStore)

module.exports = router