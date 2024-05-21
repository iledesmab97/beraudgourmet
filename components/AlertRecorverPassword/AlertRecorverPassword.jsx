import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

import MailOutlineIcon from '@mui/icons-material/MailOutline'

import { useState, useEffect } from 'react'
import useGetAlertDialogMessage from '@/hooks/useGetAlertDialogMessage'
import useDebounce from '@/hooks/useDebounce'

import { searchUser, requestPasswordRecovery } from '@/services/userApi'

const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

function validation(email) {
    let errors = ''
    if (!email) errors = 'Este campo no puede estar vacío'
    if ( email && !validEmail.test(email)) errors = 'Ingrese un correo válido'
    return errors
}

function AlertRecoverPassword() {

    const { alertDialogMessage, closeAlertDialogMessage } = useGetAlertDialogMessage({ type: 'recoverPassword'})
    const [open, setOpen] = useState(alertDialogMessage ? alertDialogMessage.open : false)
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState('')
    const { debounceSetValue } = useDebounce()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setOpen(alertDialogMessage.open)
    }, [alertDialogMessage.open])

    useEffect(() => {
        debounceSetValue(() => {
            const newError = validation(email)
            setErrors(newError)
            if (!newError) {
                searchUser(email)
                    .then(data => {
                        if (!data) setErrors('Correo no registrado')
                })
            }
        }, 500)
    }, [email])

    function handleChange(event) {
        const newEmail = event.target.value
        setEmail(newEmail)
    }

    async function sendEmail() {
        console.log('Validando datos...')
        setLoading(true)
        if (errors) {
            console.log('Datos inválidos')
            return setLoading(false)
        }
        console.log('Eviando correo...')
        const response = await requestPasswordRecovery(email)
        if (response.message) {
            setLoading(false)
            return alert(response.message)
        }
        setLoading(false)
        console.log('Solicitud enviada exitosamente')
        closeAlertDialogMessage()
    }

    return (
        <Dialog
            open={open}
            onClose={() => { closeAlertDialogMessage() }}
        >
            <DialogTitle>
                {'Alerta'}
            </DialogTitle>
            <DialogContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                }}
            >
                <DialogContentText>
                    {'Enviaremos un correo al email que indique a continuación con una contraseña temporal. Esta será la nueva contraseña para ingresar a su cuenta. Podrá cambiarla en cualquier momento.'}
                </DialogContentText>
                <TextField
                    name='email'
                    label='Email'
                    type='email'
                    fullWidth
                    size='small'
                    margin='dense'
                    helperText={ errors ? errors : ''}
                    error={Boolean(errors)}
                    value={email}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MailOutlineIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        m: '0px'
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    onClick={sendEmail}
                    disabled={errors || loading }
                >
                        Enviar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertRecoverPassword