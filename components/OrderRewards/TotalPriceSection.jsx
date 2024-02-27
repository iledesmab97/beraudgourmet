'use client'

import { useEffect, useState } from 'react'
import useGetOrder from '@/hooks/useGetOrders'
import useGetCheckout from '@/hooks/useGetCheckout'
import {totalPrice} from '@/utils/priceCar'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

function TotalPriceSection() {
    const { orders } = useGetOrder()
    const { handleAddCheckout } = useGetCheckout()
    const [prices, setPrices] = useState(() => {
        const {totalPriceCar, commissionIVA, IVA, commissionStripe, totalClient} = totalPrice(orders)
        return {
            totalPriceCar,
            commissionIVA,
            IVA,
            commissionStripe,
            totalClient
        }
    })

    useEffect(() => {
        if (!orders.length) return
        const {totalPriceCar, commissionIVA, IVA, commissionStripe, totalClient} = totalPrice(orders)
        const newPrices = {
            totalPriceCar,
            commissionIVA,
            IVA,
            commissionStripe,
            totalClient
        }
        setPrices(newPrices)
        handleAddCheckout(newPrices)
    }, [orders])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderBottom: 1,
                borderColor: 'divider'
            }}
        >
            <Box
                sx={{
                    pr: '0px',
                    pl: '0px',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >    
                <Typography variant='title'>
                    Total
                </Typography>
                <Typography variant='button' display='block' gutterBottom>
                    ${prices.totalPriceCar}
                </Typography>
            </Box>
        </Box>
    )
}

export default TotalPriceSection