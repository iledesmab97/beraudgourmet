const { Router } = require('express')
const {User} = require('../db')

function validateNumber(input) {
    const regularExpresion = /^\d+$/
    return regularExpresion.test(input)
}

const router = Router()

router.get('/', async (req, res) => {
    const {email, id} = req.query
    try {
        if (email && JSON.parse(email)) {
            const {email} = req.body
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
        res.status(200).json(allUsers)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({...req.body})
        return res.status(200).json(newUser) 
    } catch(error) {
        const {message, parent} = error
        return res.status(400).json({message, parent: parent.message})
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