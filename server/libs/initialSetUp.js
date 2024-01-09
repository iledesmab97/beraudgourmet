const {Role, User} = require('../db')

const initialRoles = [
    {
        name: 'root',
    },
    {
        name: 'admin',
    },
    {
        name: 'client',
    },
]

const initialRoot = {
    name: 'root',
    password: 'root',
    email: 'troy00pernia@gmail.com',
    phoneNumber: '+584120146661',
    promotion: false,
    verified: true,
}

module.exports = {
    createRoles: async function () {
        try {
            const roles = await Role.findAll()
            if (roles.length > 0) return
            await Role.bulkCreate(initialRoles)
        } catch(error) {
            console.error(error)
        }
    },
    createRoot: async function () {
        try {
            const root = await User.findByPk(1)
            if (root) return
            const newRoot = await User.create(initialRoot)
            await newRoot.setRole(1)
        } catch(error) {
            console.error(error)
        }
    },
}