const { Router } = require('express')
const {Store} = require('../db')

const { getAllStores, addStores, removeStore } = require('../controllers/stores.controller')

const router = Router()

router.get('/', getAllStores)

router.post('/', addStores)

router.delete('/', removeStore)

module.exports = router