'use client'

import { useState, useEffect } from 'react'
import {Stripe} from 'stripe'
import useGetModal from '@/hooks/useGetModal'
import useGetOrders from '@/hooks/useGetOrders'

import Button from '@mui/material/Button'

function ButtonPay() {

    const [stripe, setStripe] = useState(null)
    const { handleOpenModal } = useGetModal({modalType: 'pay'})
    const [canPay, setCanPay] = useState(false) 
    const {orders} = useGetOrders()

    useEffect(() => {
        if (!orders.length) return
        setCanPay(true)
    }, [orders])

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