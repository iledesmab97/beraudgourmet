'use client'

import TabBar from '@/components/TabBar/TabBar'
import DataTable from '@/components/DataTable/DataTable'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import styles from './DataPanel.module.css'

function DataPanel() {
    return (
        <Grid
            item
            xs={9}
            className={styles.DataPanel}
        >
            <Typography
                variant='encabezado'
            >
                Historial de Ordenes
            </Typography>
            <TabBar />
            <DataTable />
        </Grid>
    )
}

export default DataPanel