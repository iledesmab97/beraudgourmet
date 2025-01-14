import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

import useGetAlertDialogMessage from '@/hooks/useGetAlertDialogMessage'

function ErrorAlert() {

    const { alertDialogMessage, closeAlertDialogMessage } = useGetAlertDialogMessage({ type: 'errorAlert' })

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
                    {alertDialogMessage.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeAlertDialogMessage}>
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ErrorAlert