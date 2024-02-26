import { getAllSchedules } from '@/services/scheduleApi'
import { isOpen } from '@/utils/hours'

const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK

export function getAllStores() {
    return fetch(`${PATH_BACK}/stores`)
        .then(response => response.json())
        .then(data => {
        const newData = data.map(store => ({
            id: store.id,
            name: store.name,
            place: store.address,
            city: store.city,
            phone: store.phoneNumber,
            coordinates: store.coordinates
        }))
        return newData
        })
}

export async function updateStores() {
    const scheduels = await getAllSchedules()
    const storesList = await getAllStores()
    const closeTime = scheduels[0].scheduleHoursList[0].endTime
    const openTime = scheduels[0].scheduleHoursList[0].startTime
    const pickUpSchedule = scheduels[1].scheduleHoursList.map(schedule => ({
      days: schedule.days,
      hours: `${schedule.startTime} - ${schedule.endTime}`
    }))
    const deliverySchedule = scheduels[2].scheduleHoursList.map(schedule => ({
      days: schedule.days,
      hours: `${schedule.startTime} - ${schedule.endTime}`
    }))
    const storesWithSchedulsList = storesList.map(store => ({
      ...store,
      closeTime,
      openTime,
      pickUpSchedule,
      deliverySchedule,
      open: isOpen({closeTime, openTime})
    }))
    return storesWithSchedulsList
}