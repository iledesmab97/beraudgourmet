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
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'

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
  };

function ModalUserInfo() {

    const {open, handleCloseModal, handleChangeModal} = useGetModal({modalType: 'user'})
    const { handleRemoveUser } = useGetUser()
    const { inputs, errors, handleChange, userLoged, user, editing, handleChangeNumberPhone, signOff, handleEditing} = useHandleUser()

    return (
        <Modal
            open={open}
            onClose={() => { handleCloseModal('user') }}
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
                    errors={errors}
                    handleChange={handleChange}
                    handleChangeNumberPhone={handleChangeNumberPhone}
                    type={'text'}
                    editing={editing}
                    handleEditing={handleEditing}
                    open={open}
                />
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItmens: 'center'
                    }}
                >
                    <Typography
                        variant='p'
                        gutterBottom
                        sx={{
                            textAlign: 'center'
                        }}
                    >
                        ¿Le gustaría recibir correos electrónicos promocionales?
                    </Typography>
                    <RadioGroup
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}
                    >
                        <FormControlLabel
                            value='y'
                            control={<Radio />}
                            label='Sí'
                            sx={{
                                width: 'fit-content'
                            }}
                        />
                        <FormControlLabel
                            value='n'
                            control={<Radio />}
                            label='No'
                            sx={{
                                width: 'fit-content'
                            }}
                        />
                    </RadioGroup>
                </Grid>
                <Grid
                    item
                    sx={{
                        display:'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Button
                        onClick={() => { handleChangeModal('user', 'changePassword') }}
                    >
                        Cambiar su contraseña
                    </Button>
                    <Button
                        onClick={() => { handleChangeModal('user', 'changeEmail') }}
                    >
                        ¿Cambiar de correo electrónico?
                    </Button>
                    <Button
                        onClick={ () => {}}
                    >
                        Borrar mi cuenta
                    </Button>
                </Grid>
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        variant='p'
                        gutterBottom
                        sx={{
                            textAlign: 'center'
                        }}
                    >
                        {user.email}
                    </Typography>
                    <Button
                        onClick={ () => {
                            signOff()
                            handleCloseModal('user')
                        }}
                    >
                        Cerrar Cesión
                    </Button>
                </Grid>
            </Grid>

        </Modal>        
    )
}

export default ModalUserInfo