'use client'

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

    const { open, handleCloseModalChangePassword } = useGetModal({ modalType: 'changePassword' })
    const { inputs, errors, handleChange, changePassword } = useHandleUser()

    return (
        <Modal
            open={open}
            onClose={handleCloseModalChangePassword}
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
                    name='passwordConfimation'
                    value={inputs.passwordConfimation}
                    onChange={handleChange}
                    error={errors.passwordConfimation ? true : false}
                    helperText={errors.passwordConfimation ? errors.passwordConfimation : ''}
                />
                <TextField
                    fullWidth
                    label='Nueva contraseña'
                    type='password'
                    name='newPassword'
                    value={inputs.newPassword}
                    onChange={handleChange}
                />
                <Button
                    variant='contained'
                    sx={{
                        alignSelf: 'flex-end'
                    }}
                    onClick={() => {accept({action: changePassword}, handleCloseModalChangePassword)}}
                >
                    Cabiar contraeña
                </Button>
            </Box>
        </Modal>
    )
}

export default ModalChangePassword