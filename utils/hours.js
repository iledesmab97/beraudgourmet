import dayjs from 'dayjs'

export const weekDaysEN = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
export const weekDaysES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

const typeDelivery = {
    store: 'pickupSchedule',
    home: 'deliverySchedule'
}

export function isOpen({openTime, closeTime}) {
    const now = dayjs()
    const openTimeDay = dayjs(`${now.format('D')} ${openTime}`, 'D hh:mm a')
    const closeTimeDay = dayjs(`${now.format('D')} ${closeTime}`, 'D hh:mm a')
    return now.isAfter(openTimeDay) && now.isBefore(closeTimeDay)
}

export function dateStringToDate(date) {
    const dateString = date
    const [dateWithSlash, time] = dateString.split(' - ')
    const [day, month, year] = dateWithSlash.split('/')
    const [hour_min, am_pm] = time.split(" ")
    let [hour, mine] = hour_min.split(':')
    if (hour === '12') {
        hour = am_pm === 'am' ? '00' : hour
    } else {
        hour = am_pm === 'am' ? hour : String(Number(hour) + 12)
    }
    const totalDateString = `${year}-${month}-${day} ${hour}:${mine}:00`
    const dateA = dayjs(totalDateString, ['YYYY', 'YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss'], true)
    return dateA
}

export function timeStringToObject(time) {
    const [hour_min, am_pm] = time.split(" ")
    let [hour, mine] = hour_min.split(':')
    if (hour === '12') {
        hour = am_pm === 'am' ? '00' : hour
    } else {
        hour = am_pm === 'am' ? hour : String(Number(hour) + 12)
    }
    const date = dayjs().format('YYYY-MM-DD')
    return dayjs(`${date} ${hour}:${mine}`)
}

export function howMuchLeft(dateString) {
    const date = dateStringToDate(dateString)
    const now = dayjs()
    let comparation = date.isBefore(now)
    if (!comparation) {
        return date.isSame(now, 'day') ? 'today' : 'early'
    } else {
        return 'late'
    }
}

export function todaysScheduleIs(scheduleList, orderDay) {
    const orderDayObject = orderDay ? dayjs(orderDay, 'DD/MM/YYYY') : dayjs()
    const indexOrderDay = weekDaysEN.indexOf(orderDayObject.format('dddd'))
    return scheduleList.find(schedule => {
        const indexStart = weekDaysES.indexOf(schedule.days.split('-')[0])
        const indexEnd = weekDaysES.indexOf(schedule.days.split('-')[1])
        return indexOrderDay >= indexStart && indexOrderDay <= indexEnd
    })
}

export function getTimeLimitTodaySchedue(place) {
    if (!place.deadLine) return {
        minHour: dayjs(),
        maxHour: dayjs()
    }
    const scheduleList = place.closerStore[typeDelivery[place.typeDelivery.name]][typeDelivery[place.typeDelivery.name]]
    const orderDay = place.deadLine.date.realDate
    const scheduleOfDay = todaysScheduleIs(scheduleList, orderDay)
    const minHour = scheduleOfDay.hours.split(' - ')[0]
    const maxHour = scheduleOfDay.hours.split(' - ')[1]
    return {
        minHour: timeStringToObject(minHour),
        maxHour: timeStringToObject(maxHour)
    }
}

export function dateInRange({minHour, maxHour, currentDay}) {
    const currentDateObject = typeof currentDay === 'string' ? dateStringToDate(currentDay) : currentDay
    const minTimeObject = typeof minHour === 'string' ? timeStringToObject(minDate) : minHour
    const minDateObject = minTimeObject.date(currentDateObject.format('D')).month(Number(currentDateObject.format('M')) - 1).year(currentDateObject.format('YYYY'))
    const maxTimeObject = typeof maxHour === 'string' ? timeStringToObject(maxDate) : maxHour
    const maxDateObject = maxTimeObject.date(currentDateObject.format('D')).month(Number(currentDateObject.format('M')) - 1).year(currentDateObject.format('YYYY'))
    return currentDateObject.isAfter(minDateObject) && currentDateObject.isBefore(maxDateObject)
}