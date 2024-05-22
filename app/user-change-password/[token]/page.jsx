'use client'

import Button from "@mui/material/Button"

import AlertChangePassword from '@/components/AlertChangePassword/AlertChangePassword'

import useGetAlertDialogMessage from '@/hooks/useGetAlertDialogMessage'

function UserChangePasswordVerify({ params }) {

    const { openAlertDialogMessage } = useGetAlertDialogMessage({ type: 'changePassword' })

    return (
        <>
            <Button
                variant='contained'
                onClick={openAlertDialogMessage}
            >
                Solicitar cambio de contraseña
            </Button>
            <AlertChangePassword params={params} />
        </>
    )
}

export default UserChangePasswordVerify