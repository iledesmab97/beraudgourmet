import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

function CookieAlert({ openAlertCookie, handleOpenAlertCookie }) {

    function handleClose() {
        handleOpenAlertCookie(false)
    }

    return (
        <Dialog
            open={openAlertCookie}
            onClose={() => {handleClose(false)}}
        >
            <DialogTitle>
                {'Uso de Cookies'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {'Esta aplicación utiliza cookies para su correcto funcionamiento y así poder brindarle una mejor experiencia. Para aceptar cookies, continúe navegando como de costumbre o haga clic en "Aceptar".'}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CookieAlert