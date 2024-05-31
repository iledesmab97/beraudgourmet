'use client'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import useGetModal from '@/hooks/useGetModal'
import useHandleUser from '@/hooks/useHandleUser'
import { useState } from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '324px',
        sm: '400px'
    },
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
    const { inputsEdit, errorsEdit, handleChangeEdit, changePassword } = useHandleUser()
    const [loading, setLoading] = useState(false)

    async function handleChangePassword() {
        setLoading(true)
        if (await changePassword() === true) handleChangeModal('changePassword', 'user')
        setLoading(false)
    }

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
                    error={errorsEdit.passwordConfirmation ? true : false}
                    helperText={errorsEdit.passwordConfirmation ? errorsEdit.passwordConfirmation : ''}
                />
                <TextField
                    fullWidth
                    label='Nueva contraseña'
                    type='password'
                    name='password'
                    value={inputsEdit.password}
                    onChange={handleChangeEdit}
                    error={errorsEdit.password ? true : false}
                    helperText={errorsEdit.password ? errorsEdit.password : ''}
                />
                <Button
                    variant='contained'
                    disabled={loading}
                    sx={{
                        alignSelf: 'flex-end'
                    }}
                    onClick={handleChangePassword}
                >
                    Cabiar contraeña
                </Button>
            </Box>
        </Modal>
    )
}

export default ModalChangePassword