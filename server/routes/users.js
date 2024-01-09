require('dotenv').config({ path: '.env.local'})
const { Router } = require('express')
const {User} = require('../db')

const {getAllUsers, getUser, signUp, logIn, logOut, update, remove} = require('../controllers/users.controller')

const {verifyToken, isRoot, isAdmin} = require('../middlewares')

const router = Router()


router.get('/', [verifyToken, isAdmin], getAllUsers)
router.get('/:identifier', getUser)

router.post('/', signUp)
router.post('/login', logIn)
router.post('/logout', verifyToken, logOut)

router.put('/', verifyToken, update)

router.delete('/', verifyToken, remove)

module.exports = router