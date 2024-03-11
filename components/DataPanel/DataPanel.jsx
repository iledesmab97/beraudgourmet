'use client'

import { useState, useEffect } from 'react'
import { getAllOrders, sortOrders } from '@/services/orderApi'

import TabBar from '@/components/TabBar/TabBar'
import DataTable from '@/components/DataTable/DataTable'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import styles from './DataPanel.module.css'

function DataPanel() {

    const [tabSelected, setTabSelected] = useState(0)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        getAllOrders()
            .then(data => sortOrders(data))
            .then(data => updateOrders(data))
    }, [])


    function updateOrders(newListOrders) {
        setOrders(newListOrders)
    }

    function handleChange(event, newValue) {
        setTabSelected(newValue)
    }

    return (
        <Grid
            item
            xs={9}
            direction='column'
            gap={1}
            className={styles.DataPanel}
        >
            <Typography
                variant='encabezado'
            >
                Historial de Ordenes
            </Typography>
            <TabBar tabSelected={tabSelected} handleChange={handleChange} />
            <DataTable orders={orders} updateOrders={updateOrders} />
        </Grid>
    )
}

export default DataPanel