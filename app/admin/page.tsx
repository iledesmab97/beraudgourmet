'use client'

import { useState, useEffect } from 'react'
import ToolLateralBar from '@/components/ToolLateralBar/ToolLateralBar'
import DataPanel from '@/components/DataPanel/DataPanel'
import AlertMessage from '@/components/AlertMessage/AlertMessage'

import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import useGetUser from '@/hooks/useGetUser';
import { lookingForUserLoged } from '@/services/userApi'

import styles from './page.module.css'

function AdminPlace() {

    const [ toolSelected, setToolSelected] = useState('Client')
    const { handleAddUser } = useGetUser()

    useEffect(() => {
        lookingForUserLoged()
            .then( userLoged => {
                if (!userLoged) return
                handleAddUser(userLoged)
            })
    }, [])

    return (
        <Container maxWidth='lg'>
            <Grid
                container
                spacing={1}
                direction='row'
                alignItems='stretch'
                justifyContent='space-between'
                className={styles.AdminContainer}
            >
                <ToolLateralBar toolSelected={toolSelected} />
                <DataPanel />
            </Grid>
            <AlertMessage/>
        </Container>
    )
}

export default AdminPlace