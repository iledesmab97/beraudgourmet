const { InvalidToken } = require('../db')
const jwt =  require('jsonwebtoken')
const { parse } = require('cookie')

async function verifyToken(req, res, next) {
    try {
        if (!req.headers.cookie) throw new Error('No token provided')
        const { tokenUser } = parse(req.headers.cookie)
        if (!tokenUser) return res.status(403).json({message: 'No token provided'})
        const token = await InvalidToken.findByPk(tokenUser)
        if (token) throw new Error('invalid token')
        const user = jwt.verify(tokenUser, 'secret')
        req.user = user
        req.token = tokenUser
        next()
    } catch(error) {
        res.status(400).json({message: error.message})
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

async function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401)
}

module.exports = {verifyToken, isRoot, isAdmin, isLoggedIn}