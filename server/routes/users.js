require('dotenv').config({ path: '.env.local'})
const { Router } = require('express')
const {User} = require('../db')
const jwt =  require('jsonwebtoken')
const { serialize, parse } = require('cookie')
const bcryptjs = require('bcryptjs')
const { transporter } = require('../mailer')
const {getUser, signUp, logIn, logOut} = require('../controllers/users.controller')

const {verifyToken} = require('../middlewares')

const { GOOGLE_USER, NODE_ENV } = process.env

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

function makeJWT(userData) {
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

router.get('/', getUser)

// router.post('/', async (req, res) => {
//     const { many } = req.query
//     const { body } = req
//     try {
//         if (many && JSON.parse(many) && Array.isArray(body)) {
//             const usersList = req.body
//             const newUserList = []
//             for (let user of usersList) {
//                 const newUser = await makeUser(user)
//                 newUserList.push(newUser)
//             }
//             return res.status(200).json(newUserList)
//         }
//         const newUser = await makeUser(body)

//         const { token } = makeJWT(newUser)
//         const verificationLink = `http://localhost:3000/user-verify/${token}`

//         transporter.sendMail({
//             from: `"Verification email" <${GOOGLE_USER}>`, // sender address
//             to: newUser.email, // list of receivers
//             subject: "Verification email", // Subject line
//             // text: "", // plain text body
//             html: `<p>Te saludamos desde BeraudGourmet y te damos gracias por darnos la oportunidad de servirte con nuestras más exquisitas pizzas.</p><br/><a href='${verificationLink}'>Haz clic aquí para verificar tu cuenta.</a>`, // html body
//           })
//         return res.status(200).json(newUser) 
//     } catch(error) {
//         const {message, parent} = error
//         return res.status(400).json({message, parent: parent?.message})
//     }
// })

router.post('/', signUp)

router.post('/login', logIn)

router.post('/logout', verifyToken, logOut)

router.put('/', async (req, res) => {
    const {id, property, value} = req.body
    try {
        const updatedUser = await User.update({
            [property]: value
        }, {
            where: {
                id
            }
        })
        console.log(`se han actuliazado exitosamente ${updatedUser} usuarios`)
        res.status(200).json(updatedUser)
    } catch(error) {
        res.status(400).json({message: error.message})
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