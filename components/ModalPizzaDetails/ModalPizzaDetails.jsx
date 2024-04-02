'use client'

import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import OrderData from '@/components/ModalOrderDetails/OrderData'
import OtherData from '@/components/ModalOrderDetails/OtherData'
import PriceData from '@/components/ModalOrderDetails/PriceData'

// import styles from './ModalOrderDetails.module.css'
import dayjs from 'dayjs'

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

function ModalPizzaDetails({ openPizzaDetail, handleOpenPizzaDetail, currentPizza }) {

    return (
        <Modal
            open={ openPizzaDetail }
            onClose={() => {handleOpenPizzaDetail(false)}}
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
                    {`Pizza ${currentPizza.name} Nº ${currentPizza.id}`}
                </Typography>
                {/* <Box
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
                    <OrderData currentPizza={currentPizza} />
                    <Divider sx={{ width: '100%'}} />

                    <PriceData
                        orders={currentPizza}
                    />
                    <Divider sx={{ width: '100%'}} />
                    
                    <OtherData
                        user={currentPizza.user}
                        store={currentPizza.store}
                        dateEmited={currentPizza.applicationDate}
                        dateToRecive={currentPizza.deliveryDate}
                        deliveryInformation={currentPizza.deliveryInformation}
                    />   
                </Box>                 */}
            </Grid>
        </Modal> 
    )
}

export default ModalPizzaDetails