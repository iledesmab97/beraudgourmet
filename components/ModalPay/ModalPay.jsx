'use client'

import useGetModal from '@/hooks/useGetModal'

import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'flex-start',
    justifyContent: 'space-between',
    gap: 2,
}

function ModalPay() {

    const { open, handleCloseModal } = useGetModal({modalType: 'pay'})

    return (
        <Modal
            open={open}
            onClose={() => { handleCloseModal('pay') }}
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
                    Su cuenta
                </Typography>
                
            </Grid>

        </Modal> 
    )
}

export default ModalPay