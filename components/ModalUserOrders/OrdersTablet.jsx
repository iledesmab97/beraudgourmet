import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { extractIngredientsOut } from '@/utils/preparingData'

function OrdersTablet({orders}) {
    return (
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
                            <TableCell align='center'>ID</TableCell>
                            <TableCell >Pedido</TableCell>
                            <TableCell align='center'>Emición</TableCell>
                            <TableCell align='center'>Entrega</TableCell>
                            <TableCell
                                align='center'
                            >
                                Precio($)
                            </TableCell>
                            <TableCell
                                align='center'
                            >
                                Estatus
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            orders.map( order => (
                                <TableRow key={order.id}>
                                    <TableCell align='center'>{order.id}</TableCell>
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
                                    <TableCell align='center'>{order.applicationDate}</TableCell>
                                    <TableCell align='center'>{order.deliveryDate}</TableCell>
                                    <TableCell align='center'>{order.totalCost}</TableCell>
                                    <TableCell
                                        align='center'
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
    )
}

export default OrdersTablet