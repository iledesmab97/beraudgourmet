const {Store} = require('../db')

async function getAllStores(req, res) {
    try {
        const allStores = await Store.findAll()
        res.status(200).json(allStores)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function addStores(req, res) {
    const { many } = req.query
    try {
        if (many && JSON.parse(many)) {
            // find stores already added
            const listStoresName = req.body.map(store => store.name)
            const listStoresAdded = await Store.findAll({
                attributes: ['name'],
                where: {
                    name: listStoresName
                }
            }).then(data => data.map( store => store.name ))
            const listStoresToAdd = req.body.filter(( store ) => !listStoresAdded.includes(store.name)  )
            
            // add stores new
            const newStores = await Store.bulkCreate(listStoresToAdd)
            return res.status(200).json(newStores)
        }
        const newStore = await Store.create({...req.body})
        res.status(200).json(newStore)
    } catch(error) {
        const {message, parent} = error
        res.status(400).json({ message, parent: parent ? parent.message : null })
    }
}

async function removeStore(req, res) {
    const {id} = req.query
    try {
        if (!id) return res.status(300).json({message: 'id can\'t be undefined'})
        const storeToRemove = await Store.findByPk(id)
        if (!storeToRemove) return res.status(200).json({message: `store with id:${id} does not exist`})
        await storeToRemove.destroy()
        res.status(200).json({message: `store with id:${id} had been removed successfully`})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

async function updateStore(req, res) {
    const { id } = req.params
    const { property, value } = req.body
    try {
        const storeUpdated = await Store.update({
            [property]: value
        }, {
            where: {
                id
            }
        })
        if (!storeUpdated[0]) throw new Error('La tienda indicada no existe')
        res.status(200).json(storeUpdated)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

module.exports={
    getAllStores,
    addStores,
    removeStore,
    updateStore
}