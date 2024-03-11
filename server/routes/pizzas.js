require('dotenv').config({ path: '.env.local'})
const { Router } = require('express')
const multer = require('multer')
const {v2} = require('cloudinary')

const { getAllPizzas, addPizzas, removePizza } = require('../controllers/pizzas.controller')
const { changePropertiesOrder } = require('../controllers/orders.controller')

const {verifyToken, isRoot, isAdmin} = require('../middlewares')

const {CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET, PATH_BACK} = process.env

const upload = multer({ storage: multer.memoryStorage() })

v2.config({ 
    cloud_name: CLOUD_NAME, 
    api_key: CLOUD_API_KEY, 
    api_secret: CLOUD_API_SECRET 
})

const router = Router()

router.get( '/', getAllPizzas )

router.post( '/', addPizzas )

// router.post('/image', [verifyToken, isAdmin, upload.single('file')], async (req, res) => {
router.post('/image/:id', [upload.single('file')],async (req, res) => {
    const { id } = req.params
    try {
        const image = req.file.buffer
        const response = await new Promise((resolve, reject) => {
            v2.uploader.upload_stream({}, (err, result) => {
                if (err) reject(err)
                resolve(result)
            }).end(image)
        })
        const url = response.secure_url
        const addImage = await changePropertiesOrder(id, 'url', url)
        if (!addImage[0]) throw new Error(`There is not order with id = ${id}`)
        res.status(200).json({message: 'Imagen subida exitosamente', url, status: 'success' })
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.delete( '/', removePizza )

module.exports = router