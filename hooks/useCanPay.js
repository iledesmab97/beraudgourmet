import { useState, useEffect } from 'react'
import useGetOrders from '@/hooks/useGetOrders'
import useGetPlace from '@/hooks/useGetPlace'
import useGetUser from '@/hooks/useGetUser'

import { getTimeLimitTodaySchedue, dateInRange } from '@/utils/hours'

export default function useCanPay() {
    const [canPay, setCanPay] = useState(false)
    const {orders} = useGetOrders()
    const { place } = useGetPlace()
    const { user } = useGetUser()

    useEffect(() => {
        const { minHour, maxHour } = getTimeLimitTodaySchedue(place)
        const currentDay = place.deadLine ? place.deadLine.date.realDate + ' - ' + place.deadLine.time.realTime : null
        if ( !orders.length || !user.email || !place.closerStore || !dateInRange({minHour, maxHour, currentDay})) {
            if (canPay) return setCanPay(false)
            return
        }
        setCanPay(true)
    }, [orders, place, user])

    return { canPay }
}