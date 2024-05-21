'use client'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import ModalOrderDetail from '@/components/ModalOrderDetails/ModalOrderDetails'
import ModalMakeOrder from '@/components/ModalMakeOrder/ModalMakeOrder'

import { useState, useRef } from 'react';
import useGetAlertMessage from '@/hooks/useGetAlertMessage'
import { updateOrder, getAllOrders, sendImage } from '@/services/orderApi'
import { howMuchLeft } from '@/utils/hours'
import { captureFundsRequest } from '@/services/checkoutApi'

import styles from './DataTable.module.css'

const tableHeaders = {
    orders: [ 'Nombre', 'Teléfono' ,'Método de Pago','Fecha de entrega', 'Tipo', 'Estatus', 'Total ($)', 'Acción' ]
}

const paymentMethodIndex = {
    cash: 'Efectivo',
    transfer: 'Transferencia',
    stripe: 'Stripe'
}

const colorsCell = {
    late: 'red',
    today: '#D99914',
    early: 'green'
}

function TableOrders({ orders, updateOrders }) {

    const [anchorEl, setAnchorEl] = useState(null)
    const [currentOrder, setCurrentOrder] = useState(null)
    const [openOrderDetail, setOpenOrderDetail] = useState(false)
    const open = Boolean(anchorEl)
    const fileInput = useRef()
    const [openMakeOrder, setOpenMakeOrder] = useState(false)
    const { handleUpdateAlertMessage } = useGetAlertMessage()

    function handleOpenMakeOrder(value) {
        setOpenMakeOrder(value)
    }

    function handleOpenOrderDetail(value) {
        setOpenOrderDetail(value)
        handleClose()
    }

    function handleClick(event, order) {
        setAnchorEl(event.currentTarget)
        setCurrentOrder(order)
    }

    function handleClose() {
        setAnchorEl(null)
    }

    async function changeStatus(type) {
        const body = {
            property: type,
            value: !currentOrder[type]
        }
        const response = await updateOrder(currentOrder.id, body)
        let text, status
        if (response.message) {
            text = response.message
            status = 'error'
        } else {
            text = response
            status = 'success'
            await getAllOrders().then(data => updateOrders(data))
        }
        handleUpdateAlertMessage({
            checked: true,
            text,
            status
        })
        await handleClose()
    }

    async function addUrl() {
        fileInput.current.click()
    }

    async function handleFileSelected(event) {
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        const response = await sendImage(currentOrder.id, formData)
        const data = await response.json()
        await getAllOrders().then(data => updateOrders(data))
        handleUpdateAlertMessage({
            checked: true,
            text: data.message,
            status: data.status
        })
        handleClose()
    }

    function bColorCell(order) {
        if (order.closed) return '#4e5762'
        const when = howMuchLeft(order.deliveryDate)
        return colorsCell[when]
    }

    async function captureFunds() {
        if (currentOrder.paymentMethod === 'transfer') {
            await changeStatus('paid')
        } else if (currentOrder.paymentMethod === 'stripe') {
            const response = await captureFundsRequest(currentOrder.StripeId, currentOrder.id)
            let text, status
            if (response.message) {
                text = response.message
                status = 'error'
            } else {
                text = response
                status = 'success'
                await getAllOrders().then(data => updateOrders(data))
            }
            handleUpdateAlertMessage({
                checked: true,
                text,
                status
            })
            await handleClose()
        } else {
            alert('Hay un problema con el método de pago')
        }
    }

    return (
        <>
            <TableContainer className={styles.DataTable} component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {
                                tableHeaders.orders.map(column => (
                                    <TableCell key={column} align='center'>{column}</TableCell>
                                ))          
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody className={styles.DataTableBody}>
                        {
                            orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell align='center'>{ order.user.name }</TableCell>
                                    <TableCell align='center'>{ order.user.phoneNumber }</TableCell>
                                    <TableCell align='center'>{ paymentMethodIndex[order.paymentMethod] }</TableCell>
                                    <TableCell
                                        align='center'
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: '0.9rem',
                                                bgcolor: bColorCell(order),
                                                borderRadius: '5px',
                                                p: '5px',
                                                color: 'white',
                                            }}
                                        >
                                            { order.deliveryDate }
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='center'>{ order.delivery ? 'Delivery' : 'Recoger' }</TableCell>
                                    <TableCell align='center' sx={ order.closed ? {color:'green'} : {color:'red'} }>{ order.closed ? 'Entregado' : 'Pendiente' }</TableCell>
                                    <TableCell align='center'>{ order.totalCost }</TableCell>
                                    <TableCell align='center'>
                                        <IconButton
                                            onClick={(event) => {
                                                handleClick(event, order)
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
                onClose={handleClose}
            >
                <MenuItem
                    onClick={() => {changeStatus('closed')}}
                >
                    { currentOrder?.closed ? 'Pendiente' : 'Entregado' }
                </MenuItem>
                {
                    currentOrder && !currentOrder.url ?
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
                    onClick={() => { handleOpenOrderDetail(true) }}
                >
                    Ver Detalle
                </MenuItem>
                {
                    currentOrder?.paid === false ? (
                        <MenuItem
                            onClick={captureFunds}
                        >
                            Validar pago
                        </MenuItem>
                    ) : null
                }
            </Menu>
            {
                currentOrder ? (
                    <ModalOrderDetail openOrderDetail={openOrderDetail} handleOpenOrderDetail={handleOpenOrderDetail} currentOrder={currentOrder} />
                ) : null
            }
        </>
    )
}

export default TableOrders