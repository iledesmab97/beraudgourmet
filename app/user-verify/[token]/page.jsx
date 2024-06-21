'use client'

import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { verifyEmailUser, fetchwhoAmI } from '@/services/userApi'

function UserTokenVerify({ params }) {

    const [user, setUser] = useState(null)
    const router = useRouter()
    const [openDialog, setOpenDialog] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        findUser()
    }, [])

    function handleOpenDialog(newValue) {
        setOpenDialog(newValue)
    }

    async function findUser() {
        const { token } = params
        const user = await fetchwhoAmI(token)
        if (user.message) {
            return router.push('/not-found')
        }
        setUser(user)
        return user
    }

    async function verifyEmail() {
        setLoading(true)
        const response = await verifyEmailUser(params.token)
        if (response.message) {
            setLoading(false)
            return alert(response.message)
        }
        setLoading(false)
        handleOpenDialog(true)
    }

    return (
        <Container>
            {
                user ? (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '16px'
                        }}
                    >
                        <Typography variant="encabezado" component={'h1'}>
                            {`Saludos ${user.name}`}
                        </Typography>
                        <Typography variant="p" component={'p'} sx={{ textAlign: 'center', lineHeight: '1.5' }}>
                            Haz clic en el botón de abajo para verificar el correo electrónico.
                        </Typography>
                        <Button
                            variant='contained'
                            onClick={verifyEmail}
                            disabled={loading}
                        >
                            Verificar correo
                        </Button>
                        <Typography>

                        </Typography>
                    </Box>
                ) : null
            }
            <Dialog
                open={openDialog}
                onClose={() => { handleOpenDialog(false) }}
            >
                <DialogTitle>
                    {'Cuanta Verificada'}
                </DialogTitle>
                <DialogContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                    }}
                >
                    <DialogContentText>
                        {'Su cuenta ha sido verificada exitosamente. Si desea realizar algún pedido puede hacer click en el botón "HACER PEDIDO" de abajo'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='contained'
                        onClick={() => { router.push('/pizzas') }}
                        disabled={ loading }
                    >
                        Hacer pedido
                    </Button>
                    <Button
                        variant='contained'
                        onClick={() => { handleOpenDialog(false) }}
                        disabled={ loading }
                    >
                            Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default (UserTokenVerify)