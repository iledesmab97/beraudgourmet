import dayjs from 'dayjs'

export function isOpen({openTime, closeTime}) {
    const now = dayjs()
    const openTimeDay = dayjs(`${now.format('D')} ${openTime}`, 'D hh:mm a')
    const closeTimeDay = dayjs(`${now.format('D')} ${closeTime}`, 'D hh:mm a')
    return now.isAfter(openTimeDay) && now.isBefore(closeTimeDay)
}