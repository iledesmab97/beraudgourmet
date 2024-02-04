require('dotenv').config({ path: '.env.local'})
const { Router } = require('express')
const multer = require('multer')
const {v2} = require('cloudinary')

const { getAllPizzas, addPizzas, removePizza } = require('../controllers/pizzas.controller')

const {verifyToken, isRoot, isAdmin} = require('../middlewares')

const {CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET} = process.env

const upload = multer({ storage: multer.memoryStorage() })

v2.config({ 
    cloud_name: CLOUD_NAME, 
    api_key: CLOUD_API_KEY, 
    api_secret: CLOUD_API_SECRET 
})

const router = Router()

router.get( '/', getAllPizzas )

router.post( '/', addPizzas )

router.post('/image', [verifyToken, isAdmin, upload.single('file')], async (req, res) => {
    try {
        const image = req.file.buffer
        const response = await new Promise((resolve, reject) => {
            v2.uploader.upload_stream({}, (err, result) => {
                if (err) reject(err)
                resolve(result)
            }).end(image)
        })
        console.log('response:', response)
        res.status(200).json({message: 'Imagen subida exitosamente', url: response.secure_url})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.delete( '/', removePizza )

module.exports = router