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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ModalPizzaDetail from '@/components/ModalPizzaDetails/ModalPizzaDetails'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'

import { useState, useRef, useEffect } from 'react';
import useGetAlertMessage from '@/hooks/useGetAlertMessage'
import useGetProducts from '@/hooks/useGetProducts'
import { updateOrder, getAllOrders, sendImage } from '@/services/orderApi'
import { getPizzas, getPizzaCosts, removePizza } from '@/services/productApi'
import { howMuchLeft } from '@/utils/hours'

import styles from './DataTable.module.css'

const tableHeaders = {
    pizzas: [ 'Nombre', 'Ingredientes', 'Imagen', 'Acción' ]
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
    // const fileInput = useRef()
    // const { handleUpdateAlertMessage } = useGetAlertMessage()
    const { products, handleAddProductsList, handleUpdateProduct, handleDeleteProduct } = useGetProducts({type:'pizzas'})
    const [pizzas, setPizzas] = useState( products ? products : [])
    const { handleUpdateAlertMessage } = useGetAlertMessage()

    useEffect(() => {
        if (products) setPizzas(products)
    }, [products])

    function handleOpenPizzaDetail(value) {
        setOpenPizzaDetail(value)
        handleCloseMenu()
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

    // async function changeStatus() {
    //     const body = {
    //         property: 'closed',
    //         value: !currentPizza.closed
    //     }
    //     const response = await updateOrder(currentPizza.id, body)
    //     await handleCloseMenu()
    //     await getAllOrders().then(data => updatePizzas(data))
    // }

    // async function addUrl() {
    //     fileInput.current.click()
    // }

    // async function handleFileSelected(event) {
    //     const file = event.target.files[0]
    //     const formData = new FormData()
    //     formData.append('file', file)
    //     const response = await sendImage(currentPizza.id, formData)
    //     const data = await response.json()
    //     await getAllOrders().then(data => updatePizzas(data))
    //     handleUpdateAlertMessage({
    //         checked: true,
    //         text: data.message,
    //         status: data.status
    //     })
    //     handleCloseMenu()
    // }

    // function bColorCell(order) {
    //     if (order.closed) return '#4e5762'
    //     const when = howMuchLeft(order.deliveryDate)
    //     return colorsCell[when]
    // }

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
                {/* {
                    currentPizza && !currentPizza.url ?
                    (
                        <MenuItem
                            onClick={addUrl}
                        >
                            <>
                                subir imagen
                                <input type='file' onChange={handleFileSelected} ref={fileInput} className={styles.fileInput} />
                            </>
                        </MenuItem>
                    ) : null
                } */}
                <MenuItem
                    onClick={() => { handleOpenPizzaDetail(true) }}
                >
                    {/* <IconButton>
                        <VisibilityIcon />
                    </IconButton> */}
                    Ver Detalles
                </MenuItem>
                <MenuItem
                    onClick={handleRemovePizza}
                >
                    {/* <IconButton>
                        <EditIcon />
                    </IconButton> */}
                    Eliminar
                    {/* { currentPizza?.closed ? 'Pendiente' : 'Entregado' } */}
                </MenuItem>
            </Menu>
            {
                currentPizza ? (
                    <ModalPizzaDetail openPizzaDetail={openPizzaDetail} handleOpenPizzaDetail={handleOpenPizzaDetail} currentPizza={currentPizza} />
                ) : null
            }
        </>
    )
}

export default TablePizzas