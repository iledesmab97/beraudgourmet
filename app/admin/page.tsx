'use client'

import { useState } from 'react'
import ToolLateralBar from '@/components/ToolLateralBar/ToolLateralBar'
import DataPanel from '@/components/DataPanel/DataPanel'

import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import styles from './page.module.css'

function AdminPlace() {

    const [ toolSelected, setToolSelected] = useState('Client')

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
        </Container>
    )
}

export default AdminPlace