'use client'

import { useState } from "react"
import Button from "@mui/material/Button"
import { verifyEmailUser } from '@/services/userApi'

function UserTokenVerify({ params }: { params: any }) {

    const [ verified, setVerified ] = useState(false)

    async function verifyEmail() {
        const response: any = await verifyEmailUser(params.token)
        if (response.name) alert(response.name)
        if (response) setVerified(true)
    }

    return (
        <>
            <Button
                variant='contained'
                // margin='dense'
                onClick={verifyEmail}
            >
                {verified ? 'Correo verificado' : 'Verificar correo'}
            </Button>
        </>
    )
}

export default (UserTokenVerify)