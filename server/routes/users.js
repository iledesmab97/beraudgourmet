require('dotenv').config({ path: '.env.local'})
const { Router } = require('express')

const {getAllUsers, getUser, isEmailRegistered, signUp, logIn, logOut, updateMyAccount, updateUser, remove, verifyUser } = require('../controllers/users.controller')

const {verifyToken, isRoot, isAdmin} = require('../middlewares')

const router = Router()


router.get('/', [verifyToken, isAdmin], getAllUsers)
router.get('/registered', isEmailRegistered)
router.get('/verify/:tokenVerify', verifyUser)
router.get('/:id', [verifyToken, isAdmin], getUser)

router.post('/', signUp)
router.post('/login', logIn)
router.post('/logout', verifyToken, logOut)

router.put('/update', verifyToken, updateMyAccount)
router.put('/update/:id', [verifyToken, isAdmin], updateUser)

router.delete('/', verifyToken, remove)

module.exports = router