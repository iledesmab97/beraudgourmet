const { Router } = require('express')
const {getAllInvalidTokens, isInList, removeInvalidToken, addInvalidToken} = require('../controllers/invalidTokens.controller')

const router = Router()

router.get('/', getAllInvalidTokens)
router.get('/:token', isInList)

router.post('/', addInvalidToken)

router.delete('/', removeInvalidToken)

module.exports = router