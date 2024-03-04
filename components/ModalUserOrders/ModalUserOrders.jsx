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

import { getAllOrders } from '@/services/userApi'
import { extractIngredientsOut } from '@/utils/preparingData'

import styles from './ModalUserOrders.module.css'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: 5,
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
            onClose={() => { handleChangeModal('userOrders', 'user') }}
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
                                    <TableCell
                                        align='right'
                                        sx={{
                                            width: 'fit-content'
                                        }}
                                    >
                                        Precio($)
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: 'fit-content'
                                        }}
                                    >Estatus</TableCell>
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
                                            <TableCell align='right'>{order.totalCost}</TableCell>
                                            <TableCell >{order.closed ? 'Entregado' : 'Pendiente'}</TableCell>
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