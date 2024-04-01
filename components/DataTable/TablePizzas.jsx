'use client'

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
import ModalOrderDetail from '@/components/ModalOrderDetails/ModalOrderDetails'

import { useState, useRef } from 'react';
import useGetAlertMessage from '@/hooks/useGetAlertMessage'
import { updateOrder, getAllOrders, sendImage } from '@/services/orderApi'
import { howMuchLeft } from '@/utils/hours'

import styles from './DataTable.module.css'

const tableHeaders = {
    pizzas: [ 'Nombre', 'Ingredientes' ,'Maza','Tamaños', 'Imagen', 'Acción' ]
}

const colorsCell = {
    late: 'red',
    today: '#D99914',
    early: 'green'
}

function TablePizzas({ pizzas, updatePizzas }) {

    // const [anchorEl, setAnchorEl] = useState(null)
    // const [currentPizza, setCurrentPizza] = useState(null)
    // const [openPizzaDetail, setOpenPizzaDetail] = useState(false)
    // const open = Boolean(anchorEl)
    // const fileInput = useRef()
    // const { handleUpdateAlertMessage } = useGetAlertMessage()

    // function handleOpenPizzaDetail(value) {
    //     setOpenPizzaDetail(value)
    //     handleClose()
    // }

    // function handleClick(event, order) {
    //     setAnchorEl(event.currentTarget)
    //     setCurrentPizza(order)
    // }

    // function handleClose() {
    //     setAnchorEl(null)
    // }

    // async function changeStatus() {
    //     const body = {
    //         property: 'closed',
    //         value: !currentPizza.closed
    //     }
    //     const response = await updateOrder(currentPizza.id, body)
    //     await handleClose()
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
    //     handleClose()
    // }

    function bColorCell(order) {
        if (order.closed) return '#4e5762'
        const when = howMuchLeft(order.deliveryDate)
        return colorsCell[when]
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
                                    <TableCell align='center'>Vegetariana</TableCell>
                                    <TableCell align='center'>Calabaza, Ají, Champiñones</TableCell>
                                    <TableCell align='center'>Tradicional</TableCell>
                                    <TableCell align='center'>30cm, 45cm, 60cm</TableCell>
                                    <TableCell align='center'>https://www.imagenes.com</TableCell>
                                    <TableCell align='center'>
                                        <IconButton
                                            onClick={(event) => {
                                                handleClick(event, pizza)
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
            {/* <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={changeStatus}
                >
                    { currentPizza?.closed ? 'Pendiente' : 'Entregado' }
                </MenuItem>
                {
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
                }
                <MenuItem
                    onClick={() => { handleOpenPizzaDetail(true) }}
                >
                    Ver Detalle
                </MenuItem>
            </Menu> */}
            {/* {
                currentPizza ? (
                    <ModalOrderDetail openPizzaDetail={openPizzaDetail} handleOpenPizzaDetail={handleOpenPizzaDetail} currentPizza={currentPizza} />
                ) : null
            } */}
        </>
    )
}

export default TablePizzas