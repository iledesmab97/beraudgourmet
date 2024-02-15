require('dotenv').config({ path: '.env.local'})
const { Router } = require('express')
const passport = require('passport')
require('../auth')

const { isLoggedIn } = require('../middlewares/authjwt')
const { makeJWT } = require('../libs/validateData')

const router = Router()


router.get('/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/api/auth/google/success',
        failureRedirect: '/api/auth/google/failure'
    })
)

router.get('/google/success', isLoggedIn, async (req, res) => {
    const userData = { ...req.user }
    delete userData.password
    const { serialized } = makeJWT(userData)
    res.setHeader('Set-Cookie', serialized)
    res.redirect('/menu')
})

router.get('/google/failure', (req, res) => {
    res.status(200).json('something went wrong...')
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.send('Cerrando seción')
})

module.exports = router