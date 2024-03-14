const { Router } = require('express')
const { requestPayment, updatePaymentRequest, listAllUsers, addUser } = require('../controllers/checkout.controller')

const router = Router()

router.get('/users', listAllUsers)

router.post('/users', addUser)
router.post('/', requestPayment)

router.put('/', updatePaymentRequest)

module.exports = router