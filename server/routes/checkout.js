const { Router } = require('express')
const { requestPayment, updatePaymentRequest } = require('../controllers/checkout.controller')

const router = Router()

router.post('/', requestPayment)
router.put('/', updatePaymentRequest)

module.exports = router