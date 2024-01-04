const { Router } = require('express')
const {User} = require('../db')
const jwt =  require('jsonwebtoken')
const { serialize, parse } = require('cookie') 

function validateNumber(input) {
    const regularExpresion = /^\d+$/
    return regularExpresion.test(input)
}

const router = Router()

router.get('/', async (req, res) => {
    const {email, id, validate} = req.query
    try {
        if (email) {
            const userFinded = await User.findOne({
                where:{
                    email
                }
            })
            const userData = userFinded ? {
                ...userFinded.dataValues,
                password: '****'
            } : null
            return res.status(200).json(userData)
        }
        if (id && validateNumber(id)) {
            const userFinded = await User.findByPk(id)
            const userData = userFinded ? {
                ...userFinded.dataValues,
                password: '****'
            } : null
            return res.status(200).json(userData)
        }
        const allUsers = await User.findAll()
        const usersData = allUsers.map(user => ({
            ...user.dataValues,
            password: '****'
        }))
        res.status(200).json(usersData)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    const { many } = req.query
    try {
        if (many && JSON.parse(many)) {
            const usersList = req.body
            const newUserList = await User.bulkCreate(usersList)
            return res.status(200).json(newUserList)
        }
        const newUser = await User.create({...req.body})
        return res.status(200).json(newUser) 
    } catch(error) {
        const {message, parent} = error
        return res.status(400).json({message, parent: parent.message})
    }
})

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
            const userFinded = await User.findOne({
                where:{
                    email,
                    password
                }
            })
            if (!userFinded) {
                return res.status(401).json({message: 'Contraseña incorrecta'})
            }
            const userData = {
                ...userFinded.dataValues
            }
            delete userData.password
            const token = jwt.sign({
                ...userData.dataValues,
                exp: Math.floor(Date.now() / 1000) + 60*60*24*30
            }, 'secret')

            const serialized = serialize( 'tokenUser', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                // sameSite: 'none',
                maxAge: 1000 * 60 * 60 * 24 * 30,
                path: '/'
            })

            res.setHeader('Set-Cookie', serialized)
            return res.status(200).json(userData) 
    } catch(error) {
        const {message, parent} = error
        return res.status(400).json({message, parent: parent?.message})
    }
})

router.post('/logout', async (req, res) => {
    const { tokenUser } = parse(req.headers.cookie)
    try {
        if (!tokenUser) return res.status(200).json({message: 'No hay usuario con la sesión activa'})
        jwt.verify(tokenUser, 'secret')
        const serialized = serialize( 'tokenUser', null, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            // sameSite: 'none',
            maxAge: 0,
            path: '/'
        })
        res.setHeader('Set-Cookie', serialized)
        res.status(200).json({ message: 'Se ha cerrado seción exitosamente'})
    } catch(error) {
        const {message, parent} = error
        return res.status(400).json({message, parent: parent?.message})
    }
})

router.delete('/', async (req, res) => {
    const {id} = req.query
    try {
        if (!id) return res.status(300).json({message: 'id can\'t be undefined'})
        const userToRemove = await User.findByPk(id)
        if (!userToRemove) return res.status(200).json({message: `user with id:${id} does not exist`})
        await userToRemove.destroy()
        res.status(200).json({message: `user with id:${id} had been removed successfully`})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router