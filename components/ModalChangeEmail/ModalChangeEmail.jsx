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

function ModalChangeEmail() {

    const { open, handleChangeModal } = useGetModal({ modalType: 'changeEmail' })
    const { inputsEdit, errorsEdit, handleChangeEdit, changeEmail } = useHandleUser()
    const [loading, setLoading] = useState(false)

    async function handleChangeEmail() {
        setLoading(true)
        const successfull = await changeEmail()
        if(successfull) handleChangeModal('changeEmail', 'user')
        setLoading(false)
    }

    return (
        <Modal
            open={open}
            onClose={() => { handleChangeModal('changeEmail', 'user') }}
        >
            <Box sx={style}>
                <Typography
                    variant='title'
                    gutterBottom
                >
                    Cabiar la dirección de correo electrónico
                </Typography>
                <TextField
                    fullWidth
                    label='Nuevo correo'
                    type='text'
                    name='email'
                    value={inputsEdit.email}
                    onChange={handleChangeEdit}
                    error={errorsEdit.email ? true : false}
                    helperText={errorsEdit.email ? errorsEdit.email : ''}
                />
                <TextField
                    fullWidth
                    label='Contraseña'
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
                    onClick={handleChangeEmail}
                >
                    Cabiar contraeña
                </Button>
            </Box>
        </Modal>
    )
}

export default ModalChangeEmail