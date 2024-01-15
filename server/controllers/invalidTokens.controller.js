const {InvalidToken} = require('../db')

controllersInvalidToken = {
    getAllInvalidTokens: async function (req, res) {
        try {
            const allInvalidTokens = await InvalidToken.findAll()
            const invalidTokensData = allInvalidTokens.map(invalidToken => invalidToken.token)
            res.status(200).json(invalidTokensData)
        } catch(error) {
            res.status(400).json({message: error.message})
        }
    },
    isInList: async function (req, res) {
        const { token } = req.params
        try {
            if (!token) throw new Error('Token can not to be null')
            const invalidToken = await InvalidToken.findByPk(token)
            if (!invalidToken) return res.status(200).json({message: false})
            return res.status(200).json({message: true})
        } catch(error) {
            res.status(400).json({message: error.message})
        }
    },
    addInvalidToken: async function (req, res) {
        const { token } = req.body
        try {
            const newToken = await InvalidToken.create({ token })
            res.status(200).json({message: 'token added successfully'})
        } catch(error) {
            const {message, parent} = error
            return res.status(400).json({message, parent: parent?.message})
        }
    },
    removeInvalidToken: async function (req, res) {
        const { token } = req.body
        try {
            const tokenToRemove = await InvalidToken.findByPk(token)
            if (!tokenToRemove) throw new Error('This token is not in list')
            const tokenRemoved = await tokenToRemove.destroy()
            res.status(200).json({message: `Token had been removed successfully`})
        } catch(error) {
            res.status(400).json({message: error.message})
        }
    }
}

module.exports = controllersInvalidToken