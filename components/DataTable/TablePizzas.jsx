'use client'

import Image from 'next/image'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ModalPizzaDetail from '@/components/ModalPizzaDetails/ModalPizzaDetails'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import AddIcon from '@mui/icons-material/Add'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

import { useState, useRef, useEffect } from 'react';
import useGetAlertMessage from '@/hooks/useGetAlertMessage'
import useGetProducts from '@/hooks/useGetProducts'
import { updateOrder, getAllOrders, sendImage } from '@/services/orderApi'
import { getPizzas, getPizzaCosts, removePizza, updatePizza } from '@/services/productApi'
import { howMuchLeft } from '@/utils/hours'

import styles from './DataTable.module.css'

const tableHeaders = {
    pizzas: [ 'Estatus','Nombre', 'Ingredientes', 'Imagen', 'Acción' ]
}

const colorsCell = {
    late: 'red',
    today: '#D99914',
    early: 'green'
}

function TablePizzas() {

    const [anchorEl, setAnchorEl] = useState(null)
    const [currentPizza, setCurrentPizza] = useState(null)
    const [openPizzaDetail, setOpenPizzaDetail] = useState(false)
    const open = Boolean(anchorEl)
    const { products, handleAddProductsList, handleUpdateProduct, handleDeleteProduct } = useGetProducts({type:'pizzas'})
    const [pizzas, setPizzas] = useState( products ? products : [])
    const { handleUpdateAlertMessage } = useGetAlertMessage()
    const pizzaNew = useRef(false)

    useEffect(() => {
        if (products) setPizzas(products)
    }, [products])

    useEffect(() => {
        if (!pizzaNew.current) return
        setOpenPizzaDetail(true)
    }, [currentPizza])

    function handleOpenPizzaDetail(value) {
        setOpenPizzaDetail(value)
        handleCloseMenu()
        if (!value) {
            setCurrentPizza(null)
            pizzaNew.current = false
        }
    }

    function handleClickButtonAction(event, pizza) {
        setAnchorEl(event.currentTarget)
        setCurrentPizza(pizza)
    }

    function handleCloseMenu() {
        setAnchorEl(null)
    }

    async function handleRemovePizza() {
        const response = await removePizza(currentPizza.id)
        let text, status
        if (response.message) {
            text = response.message
            status = 'error'
        } else {
            text = response
            status = 'success'
        }
        handleUpdateAlertMessage({
            checked: true,
            text,
            status
        })
        if (!response.message) {
            handleDeleteProduct({
                type: 'pizzas',
                id: currentPizza.id
            })
        }
        handleCloseMenu()
    }

    function addNewPizza() {
        setCurrentPizza({
            id: 0,
            name: '',
            text: '',
            image: '',
            ingredients: [''],
            price: {
                '30cm': {
                    'Masa Tradicional': ''
                }
            }
        })
        pizzaNew.current = true
        handleOpenPizzaDetail(true)
    }

    async function handleStatusPizza() {
        const properties = {
            property: 'status',
            value: currentPizza.status === 'ACTIVE' ? 'DESACTIVE' : 'ACTIVE'
        }
        const response = await updatePizza(currentPizza.id, properties)
        let text, status
        if (response.message) {
            text = response.message
            status = 'error'
        } else {
            text = response
            status = 'success'
        }
        handleUpdateAlertMessage({
            checked: true,
            text,
            status
        })
        if (!response.message) {
            handleUpdateProduct({
                ...properties,
                type: 'pizzas',
                id: currentPizza.id
            })
        }
        handleCloseMenu()
    }

    return (
        <>
            <TableContainer className={styles.DataTable} component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {
                                tableHeaders.pizzas.map(column => (
                                    <TableCell key={column} align='center'>{column}</TableCell>
                                ))          
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody className={styles.DataTableBody}>
                        {
                            pizzas.map((pizza) => (
                                <TableRow key={pizza.id}>
                                    <TableCell align='center'>{
                                        pizza.status === 'ACTIVE' ? (
                                            <CheckCircleIcon sx={{ color: '#4caf50'}} />
                                        ) : (
                                            <CancelIcon sx={{ color: '#f6685e'}} />
                                        )
                                    }</TableCell>
                                    <TableCell align='center'>{pizza.name}</TableCell>
                                    <TableCell align='center'>{pizza.ingredients.join(', ')}</TableCell>
                                    <TableCell align='center'>
                                        {
                                            pizza.image ? (
                                                <Image
                                                    src={pizza.image}
                                                    alt={pizza.name}
                                                    width={130}
                                                    height={100}
                                                    style={{
                                                        objectFit: 'contain'
                                                    }}
                                                />
                                            ) : null
                                        }
                                    </TableCell>
                                    <TableCell align='center'>
                                        <IconButton
                                            onClick={(event) => {
                                                handleClickButtonAction(event, pizza)
                                            }}
                                        >
                                            <MoreHorizIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
            >
                <MenuItem
                    onClick={handleStatusPizza}
                >
                    { currentPizza?.status ? 'Desactivar' : 'Activar'}
                </MenuItem>
                <MenuItem
                    onClick={() => { handleOpenPizzaDetail(true) }}
                >
                    Ver Detalles
                </MenuItem>
                <MenuItem
                    onClick={handleRemovePizza}
                >
                    Eliminar
                </MenuItem>
            </Menu>
            {
                currentPizza ? (
                    <ModalPizzaDetail openPizzaDetail={openPizzaDetail} handleOpenPizzaDetail={handleOpenPizzaDetail} currentPizza={currentPizza} pizzaNew={pizzaNew.current} />
                ) : null
            }
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '102%',
                    right: '16px'
                }}
            >
                <Button
                    variant='contained'
                    startIcon={<AddIcon />}
                    onClick={addNewPizza}
                    disabled={!products}
                >
                    Nueva Pizza
                </Button>
            </Box>
        </>
    )
}

export default TablePizzas