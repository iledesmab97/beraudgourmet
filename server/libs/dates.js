const dayjs = require('dayjs')

function dateStringToDate(date) {
    const dateString = date
    const [dateWithSlash, time] = dateString.split(' - ')
    const [day, month, year] = dateWithSlash.split('/')
    const [hour_min, am_pm] = time.split(" ")
    let [hour, mine] = hour_min.split(':')
    hour = am_pm === 'am' ? hour !== '12' ? hour : '00' : hour !== '12' ? String((Number(hour) + 12)) : hour

    const dateA = dayjs(`${year}-${month}-${day} ${hour}:${mine}`, ['YYYY', 'YYYY-MM-DD', 'YYYY-MM-DD HH:mm'])
    return dateA
}

module.exports = {
    dateStringToDate
}