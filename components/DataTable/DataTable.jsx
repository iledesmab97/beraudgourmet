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

import { useState, useRef } from 'react';
import { updateOrder, getAllOrders } from '@/services/orderApi'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'

import styles from './DataTable.module.css'

const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK

const tableHeaders = {
    orders: [ 'Nombre', 'Teléfono' ,'Método de Pago','Fecha de entrega', 'Tipo', 'Estatus', 'Total ($)', 'Acción' ]
}

function DataTable({ orders, updateOrders }) {

    const [anchorEl, setAnchorEl] = useState(null)
    const [currentOrder, setCurrentOrder] = useState(null)
    const open = Boolean(anchorEl)
    const fileInput = useRef()
    const { handleUpdateAlertMessage } = useGetAlertMessage()

    function handleClick(event, order) {
        setAnchorEl(event.currentTarget)
        setCurrentOrder(order)
    }

    function handleClose() {
        setAnchorEl(null)
    }

    async function changeStatus() {
        const body = {
            property: 'closed',
            value: !currentOrder.closed
        }
        const response = await updateOrder(currentOrder.id, body)
        await handleClose()
        getAllOrders().then(data => updateOrders(data))
    }

    async function addUrl() {
        fileInput.current.click()
    }

    async function handleFileSelected(event) {
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        const response = await fetch(`${PATH_BACK}/pizzas/image/${currentOrder.id}`, {
          method: 'POST',
          body: formData,
        })
        const data = await response.json()
        handleUpdateAlertMessage({
            checked: true,
            text: data.message,
            status: data.status
        })
        handleClose()
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
                                    <TableCell align='center'>{ order.paymentMethod === 'transfer' ? 'Transferencia' : 'Stripe' }</TableCell>
                                    <TableCell align='center'>{ order.deliveryDate }</TableCell>
                                    <TableCell align='center'>{ order.delivery ? 'Delivery' : 'Recoger' }</TableCell>
                                    <TableCell align='center'>{ order.closed ? 'Entregado' : 'Pendiente' }</TableCell>
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
                    onClick={changeStatus}
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
            </Menu>
        </>
    )
}

export default DataTable