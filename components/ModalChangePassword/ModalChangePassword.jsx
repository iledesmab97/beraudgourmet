'use client'

import { useEffect } from 'react'
import useGetModal from '@/hooks/useGetModal'
import useHandleUser from '@/hooks/useHandleUser'
import { accept } from '@/genericFunctions/modal'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    // height: 328,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 2,
}

function ModalChangePassword() {

    const { open, handleChangeModal } = useGetModal({ modalType: 'changePassword' })
    const { inputsEdit, errors, handleChangeEdit, changePassword } = useHandleUser()

    return (
        <Modal
            open={open}
            onClose={() => { handleChangeModal('changePassword', 'user') }}
        >
            <Box sx={style}>
                <Typography
                    variant='title'
                    gutterBottom
                >
                    Definir contraseña
                </Typography>
                <TextField
                    fullWidth
                    label='Contraseña actual'
                    type='password'
                    name='passwordConfirmation'
                    value={inputsEdit.passwordConfirmation}
                    onChange={handleChangeEdit}
                    error={errors.passwordConfirmation ? true : false}
                    helperText={errors.passwordConfirmation ? errors.passwordConfirmation : ''}
                />
                <TextField
                    fullWidth
                    label='Nueva contraseña'
                    type='password'
                    name='password'
                    value={inputsEdit.password}
                    onChange={handleChangeEdit}
                    error={errors.password ? true : false}
                    helperText={errors.password ? errors.password : ''}
                />
                <Button
                    variant='contained'
                    sx={{
                        alignSelf: 'flex-end'
                    }}
                    onClick={() => {
                        if (changePassword() === 'password changed') handleChangeModal('changePassword', 'user')
                    }}
                >
                    Cabiar contraeña
                </Button>
            </Box>
        </Modal>
    )
}

export default ModalChangePassword