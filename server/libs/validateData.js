require('dotenv').config({ path: '.env.local'})
const jwt =  require('jsonwebtoken')
const { serialize, parse } = require('cookie')

const { NODE_ENV } = process.env

module.exports = {
    validateNumber: (input) => {
        const numberRegex = /^\d+$/
        return numberRegex.test(input)
    },
    validateEmail: (input) => {
        const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
        return emailRegex.test(input)
    },
    makeJWT: (userData) => {
        const token = jwt.sign({
            ...userData,
            exp: Math.floor(Date.now() / 1000) + 60*60*24*30
        }, 'secret')
    
        const serialized = serialize( 'tokenUser', token, {
            httpOnly: true,
            secure: NODE_ENV === 'production',
            sameSite: 'strict',
            // sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/'
        })
    
        return {
            token,
            serialized
        }
    },
    makeJWTVerifyUser: (userData) => {
        return jwt.sign({...userData}, 'secret', { expiresIn: '15m' })
    },
    unserialize: () => {
        return serialize( 'tokenUser', null, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            // sameSite: 'none',
            maxAge: 0,
            path: '/'
        })
    }
}