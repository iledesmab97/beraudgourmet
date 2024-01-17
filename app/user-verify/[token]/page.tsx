'use client'

import { useState } from "react"
import Button from "@mui/material/Button"
import { verifyEmailUser } from '@/app/api/userApi'

function UserTokenVerify({ params }) {

    const [ verified, setVerified ] = useState(false)

    async function verifyEmail() {
        const response = await verifyEmailUser(params.token)
        if (response.message) alert(response.message)
        if (response) setVerified(true)
    }

    return (
        <>
            <Button variant='contained' margin='dense' onClick={verifyEmail}>
                {verified ? 'Correo verificado' : 'Verificar correo'}
            </Button>
        </>
    )
}

export default (UserTokenVerify)