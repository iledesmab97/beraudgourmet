require('dotenv').config({ path: '.env.local'})
const { Router } = require('express')
const passport = require('passport')
require('../auth')

const { isLoggedIn } = require('../middlewares/authjwt')

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

router.get('/google/success', isLoggedIn, (req, res) => {
    const name = req.user?.displayName
    res.send(`Hello ${name}`)
})

router.get('/google/failure', (req, res) => {
    res.send('something went wrong...')
})

router.get('/logout', (req, res) => {
    console.log('pasando por el logout')
    req.session.destroy()
    res.send('Cerrando seción')
})

module.exports = router