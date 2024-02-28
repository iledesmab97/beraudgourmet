'use client'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import styles from './DataTable.module.css'

const tableHeaders = {
    orders: [ 'id', 'Nombre', 'Pago','Tiempo restante', 'Tipo', 'Estatus', 'Total', 'Acción' ]
}

function DataTable() {
    return (
        <TableContainer className={styles.DataTable}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            tableHeaders.orders.map(column => (
                                <TableCell>{column}</TableCell>
                            ))          
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>45612</TableCell>
                        <TableCell>Carlos González</TableCell>
                        <TableCell>Tarjeta de crédito</TableCell>
                        <TableCell>2 dias</TableCell>
                        <TableCell>Delivery</TableCell>
                        <TableCell>Pendiente</TableCell>
                        <TableCell>170</TableCell>
                        <TableCell>...</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DataTable