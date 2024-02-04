const {User, Role, InvalidToken} = require('../db')
const {emailVerification} = require('../controllers/mailer.controller')
const {validateNumber, validateEmail, makeJWT, unserialize, makeJWTVerifyUser} = require('../libs/validateData')
const bcryptjs = require('bcryptjs')
const { serialize, parse } = require('cookie')
const jwt =  require('jsonwebtoken')

async function getAllUsers (req, res) {
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
}

async function getUser (req, res) {
    const { id } = req.params
    try {
        if (!id) throw new Error('Identifier can not to be null')
        if (!validateNumber(id)) throw new Error('id need to be a number')
        const user = await User.findByPk(id)
        if (!user) throw new Error('User not finded')
        const userData = {
            ...user.dataValues
        }
        delete userData.password
        return res.status(200).json(userData)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function isEmailRegistered (req, res) {
    console.log('pasando por isEmailRegistered')
    const { email } = req.query
    try {
        if (!email) throw new Error('Identifier can not to be null')
        if (!validateEmail(email)) throw new Error('email no valid')
        const user = await User.findOne({
            where:{
                email: email
            }
        })
        if (!user) return res.status(200).json(false)
        return res.status(200).json(true)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function makeUser (props) {
    const {name, password, email, phoneNumber, promotion, verified, role} = props
    
    try {
        const newUser = await User.create({
            name,
            password,
            email,
            phoneNumber: phoneNumber ? phoneNumber : null,
            promotion,
            verified
        })
        
        if (role && role !== 'root') {            
            const roleFinded = await Role.findOne({
                where: {
                    name: role
                }
            })
            if (!roleFinded) throw new Error('the indicated role does not exist')
            newUser.setRole(roleFinded.id)
        } else await newUser.setRole(3)

        const newUserWithoutPassword = {...newUser.dataValues}
        delete newUserWithoutPassword.password
        return newUserWithoutPassword
    } catch(error) {
        return {message: error.message}
    }
}

async function signUp (req, res) {
    const { many } = req.query
    const { body } = req
    try {
        // Add many users
        if (many && JSON.parse(many) && Array.isArray(body)) {
            const usersList = req.body
            const newUserList = []
            for (let user of usersList) {
                const newUser = await makeUser(user)
                newUserList.push(newUser)
                const tokenVerify = makeJWTVerifyUser({id: newUser.id})
                emailVerification({token: tokenVerify, email: newUser.email})
            }
            return res.status(200).json(newUserList)
        }
        // Add one user
        const newUser = await makeUser(body)
        const tokenVerify = makeJWTVerifyUser({id: newUser.id})
        emailVerification({ token: tokenVerify, email: newUser.email})
        return res.status(200).json(newUser) 
    } catch(error) {
        const {message, parent} = error
        return res.status(400).json({message, parent: parent?.message})
    }
}

async function signUpAdmin (req, res) {
    const { many } = req.query
    const { body } = req
    try {
        if (many && JSON.parse(many) && Array.isArray(body)) {
            const usersList = req.body
            const newUserList = []
            for (let user of usersList) {
                // const newUser = await this.controllersUser.makeUser(user)
                const newUser = await makeUser(user)
                newUserList.push(newUser)
                const { token } = makeJWT(newUser)
                emailVerification({token, user: newUser})
            }
            return res.status(200).json(newUserList)
        }
        // const newUser = await this.controllersUser.makeUser(body)
        const newUser = await makeUser(body)
        // const { token } = makeJWT(newUser)
        const tokenVerify = makeJWTVerifyUser({id: newUser.id})
        emailVerification({ token: tokenVerify, email: newUser.email})
        return res.status(200).json(newUser) 
    } catch(error) {
        const {message, parent} = error
        return res.status(400).json({message, parent: parent?.message})
    }
}

async function logIn (req, res) {
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
}

async function logOut (req, res) {
    const { token } = req
    try {
        await InvalidToken.create({token})
        const serialized = unserialize()
        res.setHeader('Set-Cookie', serialized)
        res.status(200).json({ message: 'Se ha cerrado seción exitosamente'})
    } catch(error) {
        const {message, parent} = error
        return res.status(400).json({message, parent: parent?.message})
    }
}

async function updateMyAccount (req, res) {
    const { user } = req
    try {
        const id = user.id
        const {property, value} = req.body
        const userUpdated = await User.update({
            [property]: value
        }, {
            where: {
                id
            }
        })
        if (!userUpdated[0]) throw new Error('El usuario indicado no existe')
        res.status(200).json({message: 'se han actuliazado exitosamente'})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function updateUser (req, res) {
    const { user } = req
    const { id } = req.params
    const {property, value } = req.body
    try {
        if (!validateNumber(id)) throw new Error('id need to be a number')
        if (Number(id) === 1) throw new Error('Cannot update root user')
        const userToUpdate = await User.findByPk(id)
        if (user.RoleId === 2 && userToUpdate.RoleId === 2) throw new Error('Unauthorized')
        const userUpdated = await User.update({
            [property]: value
        }, {
            where: {
                id
            }
        })
        if (!userUpdated[0]) throw new Error('El usuario indicado no existe')
        res.status(200).json({message: 'se han actuliazado exitosamente'})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function removeMyAccount (req, res) {
    const { user, token } = req
    try {
        const id = user.id
        if (id === 1) throw new Error('The root user can not be removed')
        const userToRemove = await User.findByPk(id)
        if (!userToRemove) return res.status(400).json({message: `user with id:${id} does not exist`})
        await userToRemove.destroy()
        await InvalidToken.create({token})
        const serialized = unserialize()
        res.setHeader('Set-Cookie', serialized)
        return res.status(200).json({ message: 'The user has been removed successfully'})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function removeUser (req, res) {
    const { user } = req
    const { id } = req.params
    try {
        if (!validateNumber(id)) throw new Error('id need to be a number')
        if (Number(id) === 1) throw new Error('The root user can not be removed')
        const userToRemove = await User.findByPk(id)
        if (user.RoleId === 2 && userToRemove.RoleId === 2) throw new Error('Unauthorized')
        if (!userToRemove) return res.status(400).json({message: `user with id:${id} does not exist`})
        await userToRemove.destroy()
        res.status(200).json({message: `User had been removed successfully`})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function verifyUser (req, res) {
    const { tokenVerify } = req.params
    try {
        if (!tokenVerify) return res.status(403).json({message: 'No token provided'})
        const tokenVerifyEncoded = jwt.verify(tokenVerify, 'secret')
        const userUpdated = await User.update({
            ['verified']: true
        }, {
            where: {
                id: tokenVerifyEncoded.id
            }
        })
        res.status(200).json(userUpdated)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function whoAmI (req, res) {
    const { user } = req
    try {
        const userToReturn = {
            ...user
        }
        delete userToReturn.exp
        delete userToReturn.iat
        res.status(200).json(userToReturn)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {
    getAllUsers,
    getUser,
    whoAmI,
    verifyUser,
    removeUser,
    removeMyAccount,
    updateUser,
    updateMyAccount,
    logOut,
    logIn,
    signUpAdmin,
    signUp,
    makeUser,
    isEmailRegistered
}