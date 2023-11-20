'use client'

import { useRef } from 'react'
import useGetOrder from '@/hooks/useGetOrders'
import useTotalPrice from '@/hooks/useTotalPrice'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

function TotalPriceSection() {

    const { orders } = useGetOrder()
    const { totalPriceCar, IVA, commissionStripe, totalClient } = useTotalPrice(orders)

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                // alignItems: 'center',
                // alignItems: 'space-between',
                // justifyContent: 'space-between',
                borderBottom: 1,
                borderColor: 'divider'
            }}
        >
            {
                orders.length
                ? (
                    <List>
                        <ListItem
                            sx={{
                                pr: '0px',
                                pl: '0px',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography>
                                Total Carrito: 
                            </Typography>
                            <Typography>
                                ${totalPriceCar}
                            </Typography>
                        </ListItem>
                        <ListItem
                            sx={{
                                pr: '0px',
                                pl: '0px',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography>
                                Total IVA Stripe:
                            </Typography>
                            <Typography>
                                ${commissionStripe}
                            </Typography>
                        </ListItem>
                        <ListItem
                            sx={{
                                pr: '0px',
                                pl: '0px',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography>
                                Total IVA:
                            </Typography>
                            <Typography>
                                ${IVA}
                            </Typography>
                        </ListItem>
                    </List>
                ): null
            }
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
                    ${totalClient}
                </Typography>
            </Box>
        </Box>
    )
}

export default TotalPriceSection