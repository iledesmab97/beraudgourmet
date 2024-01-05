const { Router } = require('express')
const {User} = require('../db')
const jwt =  require('jsonwebtoken')
const { serialize, parse } = require('cookie')
const bcryptjs = require('bcryptjs')

function validateNumber(input) {
    const regularExpresion = /^\d+$/
    return regularExpresion.test(input)
}

const router = Router()

async function makeUser(props) {
    const {name, password, email, phoneNumber, promotion, verified, role} = props
    if (role) {
        const rootUser = await User.findOne({
            where: {
                role: 'root'
            }
        })
        if (rootUser) throw new Error('there is already a root user registered')
    }
    const newUser = await User.create({
        name,
        password,
        email,
        phoneNumber: phoneNumber ? phoneNumber : null,
        promotion,
        verified,
        role
    })
    const newUserWithoutPassword = {...newUser.dataValues}
    delete newUserWithoutPassword.password
    return newUserWithoutPassword
}

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
                ...userFinded.dataValues
            } : null
            delete userData.password
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
    const { body } = req
    try {
        if (many && JSON.parse(many) && Array.isArray(body)) {
            const usersList = req.body
            const newUserList = []
            for (let user of usersList) {
                const newUser = await makeUser(user)
                newUserList.push(newUser)
            }
            return res.status(200).json(newUserList)
        }
        const newUser = await makeUser(body)
        return res.status(200).json(newUser) 
    } catch(error) {
        const {message, parent} = error
        return res.status(400).json({message, parent: parent?.message})
    }
})

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        
        const userFinded = await User.findOne({
            where:{
                email
            }
        })

        if (!userFinded) {
            return res.status(401).json({message: 'Usuario no encontrado'})
        }

        const compare = await bcryptjs.compare(password, userFinded.password)

        if (!compare) {
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