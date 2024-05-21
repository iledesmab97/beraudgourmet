'use client'

import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import OrderData from '@/components/ModalOrderDetails/OrderData'
import OtherData from '@/components/ModalOrderDetails/OtherData'
import PriceData from '@/components/ModalOrderDetails/PriceData'

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

function ModalOrderDetails({ openOrderDetail, handleOpenOrderDetail, currentOrder }) {

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
                    <OrderData currentOrder={currentOrder} />
                    <Divider sx={{ width: '100%'}} />

                    <PriceData
                        orders={currentOrder}
                    />
                    <Divider sx={{ width: '100%'}} />
                    
                    <OtherData
                        user={currentOrder.user}
                        store={currentOrder.store}
                        dateEmited={currentOrder.applicationDate}
                        dateToRecive={currentOrder.deliveryDate}
                        deliveryInformation={currentOrder.deliveryInformation}
                    />   
                </Box>                
            </Grid>
        </Modal> 
    )
}

export default ModalOrderDetails