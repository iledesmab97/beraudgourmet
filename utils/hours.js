import dayjs from 'dayjs'

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
    
    const dateA = dayjs(`${year}-${month}-${day} ${hour}:${mine}`, ['YYYY', 'YYYY-MM-DD', 'YYYY-MM-DD HH:mm'])
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