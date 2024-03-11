const { Router } = require('express')
const { Order } = require('../db')
const { getAllOrders, addOrder, removeOrder, changeProperty, changePropertyForAll, changePropertiesOrder, uploadImageOrder } = require('../controllers/orders.controller')
const {verifyToken, isRoot, isAdmin} = require('../middlewares')

const multer = require('multer')

const upload = multer({ storage: multer.memoryStorage() })

const router = Router()

router.get('/', getAllOrders)
router.get('/:userId', getAllOrders)

router.post('/', addOrder)
router.post('/image/:id', [upload.single('file')], uploadImageOrder)

router.delete('/', removeOrder)

router.put('/', changePropertyForAll )
router.put('/:id', changeProperty )

module.exports = router