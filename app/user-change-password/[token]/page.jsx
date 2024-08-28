'use client'

import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

import AlertChangePassword from '@/components/AlertChangePassword/AlertChangePassword'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useGetAlertDialogMessage from '@/hooks/useGetAlertDialogMessage'

import { fetchwhoAmI } from '@/services/userApi'

function UserChangePasswordVerify({ params }) {

    const [user, setUser] = useState(null)
    const router = useRouter()
    const { openAlertDialogMessage } = useGetAlertDialogMessage({ type: 'changePassword' })

    useEffect(() => {
        findUser()
    }, [])

    async function findUser() {
        const { token } = params
        const user = await fetchwhoAmI(token)
        if (user.message) {
            return router.push('/not-found')
        }
        setUser(user)
        return user
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
                            Si has llegado hasta aca es porque deseas reiniciar tu contraseña actual. Para finalizar el proceso solo debes hacer clic en el botón de abajo. Recibirás un correo electrónico con una clave alternativa para acceder a tu cuenta. Una ves puedas acceder a tu cuenta, se recomienda modificar la contraseña por una personal.
                        </Typography>
                        <Button
                            variant='contained'
                            onClick={openAlertDialogMessage}
                        >
                            Solicitar cambio de contraseña
                        </Button>
                        <AlertChangePassword params={params} />
                    </Box>
                ) : null
            }
        </Container>
    )
}

export default UserChangePasswordVerify