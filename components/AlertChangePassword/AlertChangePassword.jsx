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

import { forgetPassword } from '@/services/userApi'

function AlertChangePassword({ params }) {

    const { alertDialogMessage, closeAlertDialogMessage } = useGetAlertDialogMessage({ type: 'changePassword' })
    const [open, setOpen] = useState(alertDialogMessage ? alertDialogMessage.open : false)
    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     console.log('alertDialogMessage:', alertDialogMessage)
    // }, [alertDialogMessage])

    useEffect(() => {
        setOpen(alertDialogMessage.open)
    }, [alertDialogMessage.open])

    // useEffect(() => {
    //     debounceSetValue(() => {
    //         const newError = validation(email)
    //         setErrors(newError)
    //         if (!newError) {
    //             searchUser(email)
    //                 .then(data => {
    //                     if (!data) setErrors('Correo no registrado')
    //             })
    //         }
    //     }, 500)
    // }, [email])

    // function handleChange(event) {
    //     const newEmail = event.target.value
    //     setEmail(newEmail)
    // }

    async function changePassword() {
        console.log('Validando datos...')
        setLoading(true)
        // if (errors) {
        //     console.log('Datos inválidos')
        //     return setLoading(false)
        // }
        // console.log('Eviando correo...')
        const response = await forgetPassword({ token: params })
        console.log('response:', response)
        if (response.message) {
            setLoading(false)
            return alert(response.message)
        }
        console.log('Solicitud enviada exitosamente')
        setLoading(false)
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
                    {'Si acepta, se borrará su contraseña actual y le enviaremos por email una contraseña temporal que podrá modificar al iniciar sesión.'}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    onClick={changePassword}
                    disabled={ loading }
                >
                        Enviar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertChangePassword