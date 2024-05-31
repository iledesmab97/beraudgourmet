'use client'

import { useState, useEffect } from "react"
import { useRouter, usePathname } from 'next/navigation'

import { fetchwhoAmI } from '@/services/userApi'

const pathByRoles = {
    '1': ['/admin', '/not-found'],
    '2': ['/admin', '/not-found'],
    '3': [ '/not-found', '/pizzas', '/', '/success', '/user-change-password', '/user-verify'],
    'pedestrians': [ '/not-found', '/pizzas', '/']
}

async function validateUser(currentPath) {
    const userTokenString = localStorage.getItem('user')
    const userToken = userTokenString ? JSON.parse(userTokenString) : null
    let user
    if (userToken) {
        user = await fetchwhoAmI(userToken)
    } else {
        user = {RoleId: 'pedestrians'}
    }
    if (pathByRoles[user.RoleId].includes(currentPath)) return {allow: true}
    return {allow: false, path: pathByRoles[user.RoleId][0] }
}

function ProtectedRoute({ children }) {

    const [allowedPath, setAllowedPath] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        validateUser(pathname)
            .then(data => {
                if (!data.allow) {
                    setAllowedPath(false)
                    router.push(data.path)
                } else {
                    setAllowedPath(true)
                }
            })
            .catch(error => alert(error.message))
    }, [pathname])

    return (
        allowedPath ? (
            children
        ) : null
    )
}

export default ProtectedRoute