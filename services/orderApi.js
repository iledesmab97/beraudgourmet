import dayjs from 'dayjs'
const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK

export function getAllOrders() {
    return fetch(`${PATH_BACK}/orders`)
        .then(response => response.json())
        .then(data => {
            if (data.message) return console.log('Ha ocurrido el siguiente error:', data.message)
            return data
        })
}

export function updateOrder(id, body) {
    return fetch(`${PATH_BACK}/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify(body),
    })
        .then(res => res.json())
        .then(data => data)
}

export function dateStringToDate(date) {
    const dateString = date
    const [dateWithSlash, time] = dateString.split(' - ')
    const [day, month, year] = dateWithSlash.split('/')
    const [hour_min, am_pm] = time.split(" ")
    let [hour, mine] = hour_min.split(':')
    hour = am_pm === 'am' ? hour !== '12' ? hour : '00' : hour !== '12' ? String((Number(hour) + 12)) : hour

    const dateA = dayjs(`${year}-${month}-${day} ${hour}:${mine}`, ['YYYY', 'YYYY-MM-DD', 'YYYY-MM-DD HH:mm'])
    return dateA
}

export function sortOrders(orders) {
    const newOrders = [...orders]

    const newOrdersSorted = newOrders.sort((a, b) => {
        // ordenar por estatus
        if (a.closed !== b.closed) return a.closed ? 1 : -1

        // ordenar por relación con el presente
        const dateA = dateStringToDate(a.deliveryDate)
        const dateB = dateStringToDate(b.deliveryDate)
        const now = dayjs()

        if (dateA.isBefore(now) !== dateB.isBefore(now)) return dateA.isBefore(now) ? -1 : 1

        // ordenar por diferencia con el presenten
        if (dateA.isBefore(now)) {
            const dateAisFirst = Math.abs(dateA.diff(now)) > Math.abs(dateB.diff(now))
            return dateAisFirst ? -1 : 1
        } else {
            const dateAisFirst = Math.abs(dateA.diff(now)) < Math.abs(dateB.diff(now))
            return dateAisFirst ? -1 : 1
        }
    })

    return newOrdersSorted
}