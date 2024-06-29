'use client'

import { useState, useEffect } from 'react'
import { getAllOrders } from '@/services/orderApi'
import { getAllUsers } from '@/services/userApi'

import TabBar from '@/components/TabBar/TabBar'
import TableOrders from '@/components/DataTable/TableOrders'
import TablePizzas from '@/components/DataTable/TablePizzas'
import TableStores from '@/components/DataTable/TableStores'
import TableUsers from '@/components/DataTable/TableUsers'

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
    },
    Stores: {
        title: 'Lista de Tiendas',
        listTabs: ['Todas las tiendas']
    },
    Users: {
        title: 'Lista de Usuarios',
        listTabs: ['Todos los usuarios']
    }
}

function DataPanel({ toolSelected }) {

    const [tabSelected, setTabSelected] = useState(0)

    function handleChange(event, newValue) {
        setTabSelected(newValue)
    }

    return (
        <Grid
            item
            container
            xs={12}
            md={9}
            direction='column'
            gap={1}
            className={styles.DataPanel}
            wrap='nowrap'
        >
            <Typography
                variant='encabezado'
                component={'h1'}
                sx={{
                    my: '16px'
                }}
            >
                {listToolOptions[toolSelected].title}
            </Typography>
            <TabBar tabSelected={tabSelected} handleChange={handleChange} listTabs={listToolOptions[toolSelected].listTabs} />
            <Box
                sx={{
                    height: {
                        xs: '60%',
                        sm: '80%',
                        md: '70%',
                    },
                    position: 'relative'
                }}
            >
                {
                    toolSelected === 'Orders' ? <TableOrders /> : null
                }
                {
                    toolSelected === 'Pizzas' ? <TablePizzas /> : null
                }
                {
                    toolSelected === 'Stores' ? <TableStores /> : null
                }
                {
                    toolSelected === 'Users' ? <TableUsers /> : null
                }
            </Box>
        </Grid>
    )
}

export default DataPanel