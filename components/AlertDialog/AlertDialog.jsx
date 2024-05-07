import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { useState, useEffect } from 'react'
import useGetAlertDialogMessage from '@/hooks/useGetAlertDialogMessage'
import useGetModal from '@/hooks/useGetModal'

// const buttonActtions = {
//     openModal: function (modalName) {
//         console.log('abriendo el modal:', modalName)

//     }
// }

function AlertDialog() {

    const { alertDialogMessage, closeAlertDialogMessage } = useGetAlertDialogMessage()
    const { handleChangeModal } = useGetModal({modalType: 'pay'})
    const [open, setOpen] = useState(alertDialogMessage ? alertDialogMessage.open : false)

    useEffect(() => {
        setOpen(alertDialogMessage.open)
    }, [alertDialogMessage.open])

    function handleActionButton(action, param) {
        handleChangeModal('pay', 'user')
        closeAlertDialogMessage(false)
    }

    return (
        <Dialog
            open={open}
            onClose={() => { closeAlertDialogMessage(false) }}
        >
            <DialogTitle>
                {alertDialogMessage.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {alertDialogMessage.text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        const [action, param] = Object.entries(alertDialogMessage.buttonAction)[0]
                        handleActionButton(action, param) }}
                >
                        Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialog