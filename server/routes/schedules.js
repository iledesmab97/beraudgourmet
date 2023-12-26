const { Router } = require('express')
const {Schedule} = require('../db')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const allSchedules = await Schedule.findAll()
        res.status(200).json(allSchedules)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    const { scheduleHoursId } = req.body
    try {
        const newSchedule = await Schedule.create({...req.body})
        newSchedule.addScheduleHours(scheduleHoursId)
        res.status(200).json(newSchedule)
    } catch(error) {
        const {message, parent} = error
        res.status(400).json({message, parent: parent.message})
    }
})

router.delete('/', async (req, res) => {
    const {id} = req.query
    try {
        if (!id) return res.status(300).json({message: 'id can\'t be undefined'})
        const scheduleToRemove = await Schedule.findByPk(id)
        if (!scheduleToRemove) return res.status(200).json({message: `schedule with id:${id} does not exist`})
        await scheduleToRemove.destroy()
        res.status(200).json({message: `schedule with id:${id} had been removed successfully`})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router