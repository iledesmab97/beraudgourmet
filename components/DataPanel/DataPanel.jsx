'use client'

import { useState, useEffect } from 'react'
import { getAllOrders } from '@/services/orderApi'

import TabBar from '@/components/TabBar/TabBar'
import TableOrders from '@/components/DataTable/TableOrders'
import TablePizzas from '@/components/DataTable/TablePizzas'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import styles from './DataPanel.module.css'

const listToolOptions = {
    Orders: {
        title: 'Historial de Ordenes',
        listTabs: ['Todas las ordenes', 'Entregadas', 'Pendientes'],
    },
    Pizzas: {
        title: 'Lista de Pizzas',
        listTabs: ['Todas las pizzas']
    }
}

function DataPanel({ toolSelected }) {

    const [tabSelected, setTabSelected] = useState(0)
    const [orders, setOrders] = useState([])
    const [list, setList] = useState([])

    useEffect(() => {
        getAllOrders()
            .then(data => updateOrders(data))
    }, [])


    function updateOrders(newListOrders) {
        setOrders(newListOrders)
    }

    function updateList(newList) {
        setList(newList)
    }

    function handleChange(event, newValue) {
        setTabSelected(newValue)
    }

    return (
        <Grid
            item
            container
            xs={9}
            direction='column'
            gap={1}
            className={styles.DataPanel}
        >
            <Typography
                variant='encabezado'
            >
                {listToolOptions[toolSelected].title}
            </Typography>
            <TabBar tabSelected={tabSelected} handleChange={handleChange} listTabs={listToolOptions[toolSelected].listTabs} />
            {
                toolSelected === 'Orders' ? <TableOrders orders={orders} updateOrders={updateOrders} /> : null
            }
            {
                toolSelected === 'Pizzas' ? <TablePizzas /> : null
            }
        </Grid>
    )
}

export default DataPanel