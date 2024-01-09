require('dotenv').config({ path: '.env.local'})
const jwt =  require('jsonwebtoken')
const { serialize, parse } = require('cookie')

const { NODE_ENV } = process.env

module.exports = {
    validateNumber: (input) => {
        const regularExpresion = /^\d+$/
        return regularExpresion.test(input)
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
    }
}