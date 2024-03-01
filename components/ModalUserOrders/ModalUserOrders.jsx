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
import Paper from '@mui/material/Paper';


import { useState, useEffect } from 'react'
import useGetModal from '@/hooks/useGetModal'
import useGetUser from '@/hooks/useGetUser'

import { getAllOrders } from '@/services/userApi'

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

const tableHeader = [ 'Pedido', 'Precio ($)', 'Estatus' ]

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
                // container
                // direction='column'
                // // justifyContent='flex-start'
                // // spacing={1}
                // alignItems='stretch'
            >
                <Typography variant='title' sx={{ flexGrow: 1 }} align='center' >Historial de Ordenes</Typography>
                {/* <Grid
                    item
                    // xs={12}
                    sx={{
                        display: 'flex',
                        // flexDirection: 'row',
                        justifyContent: 'center',
                        flexGrow: 2
                    }}
                >
                    <Typography variant='title' >Historial de Ordenes</Typography>
                </Grid> */}
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
                                            width: '100px'
                                        }}
                                    >
                                        Precio($)
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: '120px'
                                        }}
                                    >Estatus</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    orders.map( order => (
                                        <TableRow>
                                            <TableCell >1 pizza</TableCell>
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