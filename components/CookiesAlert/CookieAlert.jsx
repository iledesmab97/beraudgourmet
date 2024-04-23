import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

import { useState, useEffect } from 'react'
import useLocalData from '@/hooks/useLocalData'

function CookieAlert() {

    const [open, setOpen] = useState(false)
    const { saveLocalData, getLocalData } = useLocalData()

    useEffect(() => {
        const acceptCookies = getLocalData('acceptCookies')
        if (!acceptCookies || !JSON.parse(acceptCookies)) handleOpen(true)
    }, [])

    function handleOpen(value) {
        setOpen(value)
    }

    function acceptCookies() {
        saveLocalData('acceptCookies', true)
        handleOpen(false)
    }

    return (
        <Dialog
            open={open}
            onClose={() => {handleOpen(false)}}
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
                <Button onClick={acceptCookies}>
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CookieAlert