'use client'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useHandleUser from '@/hooks/useHandleUser'

function CurrentSession() {

    const [ anchorEl, setAnchorEl ] = useState(null)
    const { signOff } = useHandleUser()
    const router = useRouter()

    function handleOpenUserMenu(event) {
        setAnchorEl(event.currentTarget)
    }

    function handleCloseUserMenu() {
        setAnchorEl(null)
    }

    function logOut() {
        signOff()
        router.push('/menu')
    }

    return (
        <Box
            sx={{
                flexGrow: '0'
            }}
        >  
            <Card
                onClick={handleOpenUserMenu}
                elevation={0}
                sx={{
                    p: '0px',
                    bgcolor: 'transparent',
                    cursor: 'pointer'
                }}
            >
                <CardHeader
                    avatar={<Avatar>R</Avatar>}
                    title='Rubén Blades'
                    subheader='Administrador'
                />
            </Card>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem
                    onClick={logOut}
                >
                    <Typography>
                        Cerrar Sesión
                    </Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default CurrentSession