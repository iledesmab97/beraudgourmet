import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from "@mui/material/TablePagination";

import TablePaginationActions from "@/components/TablePaginationActions/TablePaginationActions"
import EmptyOrdersContainer from "@/components/ModalUserOrders/EmptyOrdersContainer"

import CenteredSpinner from '../LoadingComponets/CenteredSpinner';

import { extractIngredientsOut } from '@/utils/preparingData'
import { dateStringToDate } from '@/utils/hours';

function OrdersTablet({ orders, ubers, loading, pagination }) {
    const { count, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage } = pagination

    function getFormatOrderDate(dateString) {
        const date = dateStringToDate({ dateString }) 
        return date.format("DD/MM/YYYY - HH:mm")
    }

    return (
        <Grid
            item
            sx={{
                p: 1,
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: "center",
                overflow: "hidden"
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <TableContainer
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    <Table stickyHeader>
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
                                loading ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            sx={{
                                                p: 0
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    height: "441px"
                                                }}
                                            >
                                                <CenteredSpinner />
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ) : !orders.length ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            sx={{
                                                p: 0
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    height: "441px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <EmptyOrdersContainer/> 
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    orders.map( order => (
                                        <>
                                            <TableRow
                                                key={order.id}
                                                sx={ ubers[order.id] && {
                                                    '& > *': {
                                                        borderBottom: "none"
                                                    }
                                                }}
                                            >
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
                                                <TableCell align='center'>{getFormatOrderDate(order.applicationDate)}</TableCell>
                                                <TableCell align='center'>{getFormatOrderDate(order.deliveryDate)}</TableCell>
                                                <TableCell align='center'>{order.totalCost}</TableCell>
                                                <TableCell
                                                    align='center'
                                                    sx={ order.closed ? {color: 'green'} : {color: 'red'} }
                                                >
                                                    {order.closed ? 'Entregado' : 'Pendiente'}
                                                </TableCell>
                                            </TableRow>
                                            {
                                                ubers[order.id] && !order.closed ? (
                                                    <TableRow>
                                                        <TableCell
                                                            colSpan={6}
                                                            sx={{
                                                                pt: "0px"
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    justifyContent: "flex-end",
                                                                    alignItems: "center"
                                                                }}
                                                            >
                                                                <Button
                                                                    component="a"
                                                                    variant="contained"
                                                                    color='primary'
                                                                    href={ubers[order.id]}
                                                                    target='_blank'
                                                                >
                                                                    Seguimiento
                                                                </Button>
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                ) : null
                                            }
                                        </>
                                    ))
                                ) 
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box
                    sx={{
                        width: "100%",
                        height: "auto",
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <TablePagination
                        rowsPerPageOptions={[10, 15, 25]}
                        component="div"
                        count={count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => {
                            handleChangePage(newPage);
                        }}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage={"Filas por página"}
                        ActionsComponent={TablePaginationActions}
                    />
                </Box>
            </Paper>
        </Grid>
    )
}

export default OrdersTablet