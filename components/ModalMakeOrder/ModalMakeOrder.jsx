'use client'

import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import OrderData from './OrderData'

import { useState } from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    height: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
}

function ModalMakeOrder({ openMakeOrder, handleOpenMakeOrder, currentOrder }) {

    const [orderData, setOrderData] = useState({
        user: {}
    })

    function handleOrderData() {

    }

    return (
        <Modal
            open={ openMakeOrder }
            onClose={() => {handleOpenMakeOrder(false)}}
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
                    Nueva Order
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
                    <OrderData orderData={orderData} handleOrderData={handleOrderData} />

                </Box>                
            </Grid>
        </Modal> 
    )
}

export default ModalMakeOrder