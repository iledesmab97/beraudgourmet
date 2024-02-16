require('dotenv').config({ path: '.env.local'})
const { Router } = require('express')

const {getAllUsers, getUser, isEmailRegistered, signUp, signUpAdmin, logIn, logOut, updateMyAccount, updateUser, removeMyAccount, removeUser, verifyUser, whoAmI, verifyProperty } = require('../controllers/users.controller')

const {verifyToken, isRoot, isAdmin} = require('../middlewares')

const router = Router()


router.get('/', [verifyToken, isAdmin], getAllUsers)
router.get('/registered', isEmailRegistered)
router.get('/verify/:tokenVerify', verifyUser)
router.get('/loged', verifyToken, whoAmI)
router.get('/:id', [verifyToken, isAdmin], getUser)

router.post('/signup', signUp)
router.post('/signup-admin', [verifyToken, isRoot], signUpAdmin)
router.post('/login', logIn)
router.post('/logout', verifyToken, logOut)
router.post('/verify/:property', [verifyToken], verifyProperty)

router.put('/update', verifyToken, updateMyAccount)
router.put('/update/:id', [verifyToken, isAdmin], updateUser)

router.delete('/remove', verifyToken, removeMyAccount)
router.delete('/remove/:id', [verifyToken, isAdmin], removeUser)

module.exports = router