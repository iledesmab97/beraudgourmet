const jwt =  require('jsonwebtoken')
const { parse } = require('cookie')

async function verifyToken(req, res, next) {
    const { tokenUser } = parse(req.headers.cookie)
    try {
        if (!tokenUser) return res.status(403).json({message: 'No token provided'})
        jwt.verify(tokenUser, 'secret')
        next()
    } catch(error) {
        res.status(400).json({message: 'Unauthorized'})
    }
}

module.exports = verifyToken