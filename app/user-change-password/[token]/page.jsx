'use client'

import Button from "@mui/material/Button"

import AlertChangePassword from '@/components/AlertChangePassword/AlertChangePassword'

import { useState } from "react"
import useGetAlertDialogMessage from '@/hooks/useGetAlertDialogMessage'


// import { verifyEmailUser } from '@/services/userApi'

function UserChangePasswordVerify({ params }) {

    const { openAlertDialogMessage } = useGetAlertDialogMessage({ type: 'changePassword' })

    // async function verifyEmail() {
    //     const response: any = await verifyEmailUser(params.token)
    //     if (response.name) alert(response.name)
    //     if (response) setVerified(true)
    // }

    return (
        <>
            <Button
                variant='contained'
                // margin='dense'
                onClick={openAlertDialogMessage}
            >
                Solicitar cambio de contraseña
            </Button>
            <AlertChangePassword params={params} />
        </>
    )
}

export default UserChangePasswordVerify