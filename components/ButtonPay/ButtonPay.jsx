'use client'

import { useState, useEffect } from 'react'
import useGetModal from '@/hooks/useGetModal'
import useGetOrders from '@/hooks/useGetOrders'
import useGetPlace from '@/hooks/useGetPlace'
import useGetUser from '@/hooks/useGetUser'

import Button from '@mui/material/Button'

import { getTimeLimitTodaySchedue, dateInRange } from '@/utils/hours'

function ButtonPay() {

    const { handleOpenModal } = useGetModal({modalType: 'pay'})
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

    return (
        <Button
            variant='contained'
            color='secondary'
            sx={{ my:1 }}
            fullWidth
            disabled={!canPay}
            onClick={() => {
                handleOpenModal('pay')
            }}
        >Pagar</Button>
    )
}

export default ButtonPay