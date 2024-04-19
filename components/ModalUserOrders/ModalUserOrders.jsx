'use client'

import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useState, useEffect } from 'react'
import useGetModal from '@/hooks/useGetModal'
import useGetUser from '@/hooks/useGetUser'

import { getAllOrders } from '@/services/orderApi'
import { extractIngredientsOut } from '@/utils/preparingData'

import styles from './ModalUserOrders.module.css'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '324px',
        sm: '700px'
    },
    height: {
        xs: '80%',
        sm: '700px'
    },
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: {
        xs: 2,
        sm: 5
    },
    display: 'flex',
    flexDirection: 'column',
    alignItem: 'center'
}

function ModalUserOrders() {

    const { open, handleChangeModal } = useGetModal({ modalType: 'userOrders' })
    const { user } = useGetUser()
    const [ orders, setOrders ] = useState([])

    useEffect(() => {
        if (!user.id) return
        getAllOrders(user.id).then( data => setOrders(data) )
    }, [open])

    return (
        <Modal
            open={open}
            onClose={() => {
                handleChangeModal('userOrders', 'user')
                localStorage.removeItem('modalToOpen')
            }}
        >
            <Box
                sx={style}
            >
                <Typography
                    variant='title'
                    sx={{
                        // flexGrow: 1,
                        mb: 3
                    }}
                    align='center'
                >
                    Historial de Ordenes
                </Typography>
                <Grid
                    item
                    sx={{
                        flexGrow: 1,
                        overflowY: 'auto'
                    }}
                >
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell >Pedido</TableCell>
                                    <TableCell >Emición</TableCell>
                                    <TableCell >Entrega</TableCell>
                                    <TableCell
                                        align='right'
                                    >
                                        Precio($)
                                    </TableCell>
                                    <TableCell
                                    >
                                        Estatus
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    orders.map( order => (
                                        <TableRow key={order.id}>
                                            <TableCell
                                                dangerouslySetInnerHTML={{
                                                    __html: order.itemsxOrder.map(item => {
                                                        const ingredinetsOut = extractIngredientsOut(item.description)
                                                        if (!ingredinetsOut.length) return item.description
                                                        const index = item.description.indexOf(', ~')
                                                        return (
                                                            item.description.slice(0, index) + ingredinetsOut.map( ingredient => `, <span style="text-decoration: line-through">${ingredient}</span>` ).join('')
                                                        )
                                                    }).join('; ')
                                                }}/>
                                            <TableCell align='right'>{order.applicationDate}</TableCell>
                                            <TableCell align='right'>{order.deliveryDate}</TableCell>
                                            <TableCell align='right'>{order.totalCost}</TableCell>
                                            <TableCell
                                                sx={ order.closed ? {color: 'green'} : {color: 'red'} }
                                            >
                                                {order.closed ? 'Entregado' : 'Pendiente'}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Box>
        </Modal>
    )
}

export default ModalUserOrders