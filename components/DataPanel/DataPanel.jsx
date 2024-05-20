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
    const [orders, setOrders] = useState([])
    const [users, setUsers] = useState([])
    const [list, setList] = useState([])

    useEffect(() => {
        getAllOrders()
            .then(data => {
                if (!data.message) return updateOrders(data)
                return alert(data.message)
            })
            .catch(error => alert(error.message))
        getAllUsers()
            .then(data => {
                setUsers(data)
            })
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

    function handleChangeUsers(userList) {
        setUsers(userList)
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
            {
                toolSelected === 'Stores' ? <TableStores /> : null
            }
            {
                toolSelected === 'Users' ? <TableUsers users={users} handleChangeUsers={handleChangeUsers} /> : null
            }

        </Grid>
    )
}

export default DataPanel