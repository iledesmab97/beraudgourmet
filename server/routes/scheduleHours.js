const { Router } = require('express')
const {ScheduleHours} = require('../db')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const allScheduleHours = await ScheduleHours.findAll()
        res.status(200).json(allScheduleHours)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    const { many } = req.query
    try {
        if (many) {
            const newScheduleHours = await ScheduleHours.bulkCreate(req.body)
            return res.status(200).json(newScheduleHours)
        }
        const newScheduleHour = await ScheduleHours.create({...req.body})
        res.status(200).json(newScheduleHour)
    } catch(error) {
        const {message, parent} = error
        res.status(400).json({message, parent: parent.message})
    }
})

router.delete('/', async (req, res) => {
    const {id} = req.query
    try {
        if (!id) return res.status(300).json({message: 'id can\'t be undefined'})
        const scheduleHoursToRemove = await ScheduleHours.findByPk(id)
        if (!scheduleHoursToRemove) return res.status(200).json({message: `scheduleHours with id:${id} does not exist`})
        await scheduleHoursToRemove.destroy()
        res.status(200).json({message: `scheduleHours with id:${id} had been removed successfully`})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router