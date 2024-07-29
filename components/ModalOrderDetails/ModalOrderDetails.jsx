'use client'

import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import OrderData from '@/components/ModalOrderDetails/OrderData'
import OtherData from '@/components/ModalOrderDetails/OtherData'
import PriceData from '@/components/ModalOrderDetails/PriceData'

import { useState, useEffect, useRef } from 'react'

import { getOneOrder } from '@/services/orderApi'
import styles from './ModalOrderDetails.module.css'
import dayjs from 'dayjs'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '324px',
        sm: '500px',
        md: '750px'
    },
    height: {
        xs: '80%',
        md: '700px'
    },
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: {
        xs: 2,
        sm: 4,
        md: 5
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
}

function ModalOrderDetails({ openOrderDetail, handleOpenOrderDetail, currentOrder, handleUpdateOrderProperty }) {

    const [order, setOrder] = useState(null)
    const firstTime = useRef(true)

    useEffect(() => {
        if (!firstTime.current) return
        fetchOrder(currentOrder.id)
        firstTime.current = false
    }, [])

    async function fetchOrder(id) {
        const response = await getOneOrder(id)
        if (response.message) {
            alert(response.message)
            return
        }
        setOrder(response)
    }

    return (
        <Modal
            open={ openOrderDetail }
            onClose={() => {handleOpenOrderDetail(false)}}
        >
            <Grid
                container
                sx={style}
                alignItems={'stretch'}
            >
                <Typography
                    variant='title'
                    gutterBottom
                >
                    {`Orden Nº ${currentOrder.id}`}
                </Typography>
                <Box
                    sx={{
                        height: '90%',
                        width: '100%',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '16px',
                        pr: '8px',
                        boxSizing: 'border-box'
                    }}
                >
                    {
                        order ? (
                            <>
                                <OrderData currentOrder={order} handleUpdateOrderProperty={handleUpdateOrderProperty} />
                                <Divider sx={{ width: '100%'}} />

                                <PriceData
                                    orders={order}
                                />
                                <Divider sx={{ width: '100%'}} />
                                
                                <OtherData
                                    currentOrder={order}
                                    user={order.user}
                                    store={order.store}
                                    dateEmited={order.applicationDate}
                                    dateToRecive={order.deliveryDate}
                                    deliveryInformation={order.deliveryInformation}
                                    handleUpdateOrderProperty={handleUpdateOrderProperty}
                                />  
                            </>
                        ) : null
                    } 
                </Box>                
            </Grid>
        </Modal> 
    )
}

export default ModalOrderDetails