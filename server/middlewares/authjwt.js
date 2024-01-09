const jwt =  require('jsonwebtoken')
const { parse } = require('cookie')

async function verifyToken(req, res, next) {
    try {
        const { tokenUser } = parse(req.headers.cookie)

        if (!tokenUser) return res.status(403).json({message: 'No token provided'})
        const user = jwt.verify(tokenUser, 'secret')
        req.user = user
        next()
    } catch(error) {
        res.status(400).json({message: 'Unauthorized'})
    }
}

async function isRoot(req, res, next) {
    const { user } = req
    try {
        if (user.RoleId !== 1) throw new Error('Unauthorized')
        next()
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function isAdmin(req, res, next) {
    const { user } = req
    try {
        if (user.RoleId > 2) throw new Error('Unauthorized')
        next()
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {verifyToken, isRoot, isAdmin}