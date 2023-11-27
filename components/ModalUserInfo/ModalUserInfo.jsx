'use client'

import { useState, useEffect } from 'react'
import useGetModal from '@/hooks/useGetModal'
import useGetUser from '@/hooks/useGetUser'
import useHandleUser from '@/hooks/useHandleUser'
import UserLoged from '../OrderRewards/UserLoged'
import { accept } from '@/genericFunctions/modal'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

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
    justifyContent: 'flex-start',
    gap: 2,
  };

function ModalUserInfo() {

    const {open, handleCloseModalUser} = useGetModal({modalType: 'user'})
    const { handleRemoveUser } = useGetUser()
    const { inputs, handleChange, userLoged, handleChangeNumberPhone} = useHandleUser()

    return (
        <Modal
            open={open}
            onClose={handleCloseModalUser}
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
                <UserLoged
                    userLoged={userLoged}
                    inputs={inputs}
                    handleChange={handleChange}
                    handleChangeNumberPhone={handleChangeNumberPhone}
                    type={'text'}
                />
                <Button
                    onClick={ () => {accept({action: handleRemoveUser}, handleCloseModalUser)}}
                >
                    Cerrar Cesión
                </Button>
            </Grid>

        </Modal>        
    )
}

export default ModalUserInfo