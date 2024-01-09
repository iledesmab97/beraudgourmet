const {User} = require('../db')
const {emailVerification} = require('../controllers/mailer.controller')
const {validateNumber, makeJWT} = require('../libs/validateData')
const bcryptjs = require('bcryptjs')
const { serialize, parse } = require('cookie')
const jwt =  require('jsonwebtoken')

module.exports = {
    getAllUsers: async function (req, res) {
        try {
            const allUsers = await User.findAll()
            const usersData = allUsers.map(user => {
                const userData = {
                    ...user.dataValues
                }
                delete userData.password
                return userData
            })
            res.status(200).json(usersData)
        } catch(error) {
            res.status(400).json({message: error.message})
        }
    },
    getUser: async function (req, res) {
        const { email, id } = req.query
        try {
            if (!email && !id) throw new Error('Email or id can not to be null')
            let user
            if (email) {
                user = await User.findOne({
                    where:{
                        email
                    }
                })
            }
            if (id && validateNumber(id)) {
                user = await User.findByPk(id)
            }
            if (!user) throw new Error('User not finded')
            const userData = {
                ...user.dataValues
            }
            delete userData.password
            return res.status(200).json(userData)
        } catch(error) {
            res.status(400).json({message: error.message})
        }
    },
    makeUser: async function (props) {
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
    },
    signUp :async function (req, res) {
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
            const newUser = await this.makeUser(body)
    
            const { token } = makeJWT(newUser)
            emailVerification(token)
            return res.status(200).json(newUser) 
        } catch(error) {
            const {message, parent} = error
            return res.status(400).json({message, parent: parent?.message})
        }
    },
    logIn: async function (req, res) {
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
    
            const { serialized } = makeJWT(userData)
    
            res.setHeader('Set-Cookie', serialized)
            return res.status(200).json(userData) 
        } catch(error) {
            const {message, parent} = error
            return res.status(400).json({message, parent: parent?.message})
        }
    },
    logOut: async function (req, res) {
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
    }
}