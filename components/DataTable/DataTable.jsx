'use client'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import styles from './DataTable.module.css'

const tableHeaders = {
    orders: [ 'Nombre', 'Teléfono' ,'Método de Pago','Fecha de entrega', 'Tipo', 'Estatus', 'Total ($)', 'Acción' ]
}

function DataTable({ orders }) {
    return (
        <TableContainer className={styles.DataTable} component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            tableHeaders.orders.map(column => (
                                <TableCell align='center'>{column}</TableCell>
                            ))          
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orders.map(order => (
                            <TableRow>
                                <TableCell align='center'>{order.user.name}</TableCell>
                                <TableCell align='center'>{order.user.phoneNumber}</TableCell>
                                <TableCell align='center'>{order.StripeId ? 'Stripe' : 'Transferencia' }</TableCell>
                                <TableCell align='center'>{order.deliveryDate}</TableCell>
                                <TableCell align='center'>Delivery</TableCell>
                                <TableCell align='center'>Pendiente</TableCell>
                                <TableCell align='center'>{order.totalCost}</TableCell>
                                <TableCell align='center'>...</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DataTable