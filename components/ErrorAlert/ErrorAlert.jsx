import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

import { useState, useEffect } from 'react'
import useLocalData from '@/hooks/useLocalData'
import useGetAlertDialogMessage from '@/hooks/useGetAlertDialogMessage'

const typesMessages = {
    "unexpectedError": {
        "title": "Error",
        "content": "Ha surgido un error al crear la orden. Por favor intente nuevamente"
    },
    "errorOnServer": {
        "title": "Error",
        "content": "Estamos teniendo problemas en el sistema. Por favor intenta nuevamente más tarde"
    }
}

function ErrorAlert() {

    const { alertDialogMessage, closeAlertDialogMessage, updateDialogMessage } = useGetAlertDialogMessage({ type: 'errorAlert' })

    return (
        <Dialog
            open={alertDialogMessage.open}
            onClose={closeAlertDialogMessage}
        >
            <DialogTitle>
                {'Error'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {alertDialogMessage.numberOpened <= 1 ? typesMessages.unexpectedError.content : typesMessages.errorOnServer.content}
                </DialogContentText>
            </DialogContent>
            {
                alertDialogMessage.numberOpened <= 1 ? (
                    <DialogActions>
                        <Button onClick={closeAlertDialogMessage}>
                            Cerrar
                        </Button>
                    </DialogActions>
                ) : null
            }
        </Dialog>
    )
}

export default ErrorAlert