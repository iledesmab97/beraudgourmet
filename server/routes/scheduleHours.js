const { Router } = require('express')
const {ScheduleHours} = require('../db')
const dayjs = require('dayjs')

const { getAllScheduleHours, addScheduleHours, removeScheduleHour, changeScheduleHourFormatTime, updateScheduleHour } = require('../controllers/scheduleHour.controller')

const router = Router()

router.get('/', getAllScheduleHours)

router.post('/', addScheduleHours)

router.delete('/', removeScheduleHour)

// router.put('/', updateScheduleHour)
router.put('/:id', updateScheduleHour)
router.put('/changeFormat', changeScheduleHourFormatTime)

module.exports = router