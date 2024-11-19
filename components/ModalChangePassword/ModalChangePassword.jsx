'use client'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import useGetModal from '@/hooks/useGetModal'
import useHandlerUserThunk from "@/hooks/useHandlerUserThunk"

import { getInputsErrors } from "@/utils/preparingData"

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

    const { user, statusUser, errorUser } = useSelector(state => state.user)
    const { open, handleChangeModal } = useGetModal({ modalType: 'changePassword' })
    const [inputs, setInputs] = useState({
        password: "",
        newPassword: ""
    })
    const [errors, setErrors] = useState({
        password: "",
        newPassword: ""
    })

    const { updateUser } = useHandlerUserThunk()

    function handleChangeInputs(event) {
        const { name: property, value } = event.target
        const newInputs = {
            ...inputs,
            [property]: value
        }
        handleErrors(newInputs)
        setInputs(newInputs)
    }

    function handleErrors({ password, newPassword }) {
        const { password: passwordError } = getInputsErrors({ password })
        const { password: newPasswordError } = getInputsErrors({ password: newPassword })
        const newErrors = {
            ...(passwordError && { password: passwordError }),
            ...(newPasswordError && { newPassword: newPasswordError })
        }
        setErrors(newErrors)
    }

    async function handleChangePassword() {
        updateUser({
            property: "password",
            value: inputs.newPassword,
            verification: inputs.password
        })
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
                    name='password'
                    value={inputs.password}
                    onChange={handleChangeInputs}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                />
                <TextField
                    fullWidth
                    label='Nueva contraseña'
                    type='password'
                    name='newPassword'
                    value={inputs.newPassword}
                    onChange={handleChangeInputs}
                    error={Boolean(errors.newPassword)}
                    helperText={errors.newPassword}
                />
                <Button
                    variant='contained'
                    disabled={statusUser === "loading" || Object.keys(errors).length}
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