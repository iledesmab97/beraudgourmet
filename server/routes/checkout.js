const { Router } = require('express')
const { requestPayment } = require('../controllers/checkout.controller')

const router = Router()

router.post('/', requestPayment)

module.exports = router