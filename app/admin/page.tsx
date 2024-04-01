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

    const [ toolSelected, setToolSelected] = useState('Orders')
    const { handleAddUser } = useGetUser()

    useEffect(() => {
        lookingForUserLoged()
            .then( userLoged => {
                if (!userLoged) return
                handleAddUser(userLoged)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleToolSelected(event: any) {
        setToolSelected(event.target.textContent)
    }

    return (
        <Container maxWidth='lg'>
            <Grid
                container
                spacing={1}
                alignItems='stretch'
                justifyContent='space-between'
                className={styles.AdminContainer}
            >
                <ToolLateralBar toolSelected={toolSelected} handleToolSelected={handleToolSelected} />
                <DataPanel toolSelected={toolSelected} />
            </Grid>
            <AlertMessage/>
        </Container>
    )
}

export default AdminPlace