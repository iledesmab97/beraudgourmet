const { Router } = require('express')
const { Schedule, ScheduleHours} = require('../db')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const allSchedules = await Schedule.findAll({
            include: ScheduleHours
        })
        const schedulesList = allSchedules.map(schedule => {
            const { id, name, ScheduleHours } = schedule
            const scheduleHoursList = ScheduleHours.map(scheduleHours => {
                const {day, startTime, endTime} = scheduleHours
                return {
                    days: day,
                    startTime,
                    endTime
                } 
            })
            return {
                id,
                name,
                scheduleHoursList
            }
        })
        res.status(200).json(schedulesList)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    const { many } = req.query
    const { scheduleHoursId } = req.body
    try {
        if (many && JSON.parse(many)) {
            const listSchedules = req.body
            const newSchedules = listSchedules.map(async(schedule) => {
                const { scheduleHoursId } = schedule
                const newSchedule = await Schedule.create(schedule)
                if (scheduleHoursId) {
                    newSchedule.addScheduleHours(scheduleHoursId)
                }
                return newSchedule
            })
            return Promise.all(newSchedules)
                .then(result => res.status(200).json(result))
                .catch(error => {throw new Error({message: error.message})})
        }
        const newSchedule = await Schedule.create({...req.body})
        newSchedule.addScheduleHours(scheduleHoursId)
        res.status(200).json(newSchedule)
    } catch(error) {
        const {message, parent} = error
        res.status(400).json({message, parent: parent ? parent.message : null})
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