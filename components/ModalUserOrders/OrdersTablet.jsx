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
                flexGrow: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
        >
            <TableContainer
                sx={{
                    flexGrow: 1,
                    maxHeight: "calc(100% - 52px)",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
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
                            loading ? null : (
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
            {
                loading ? (
                    <Box
                        sx={{
                            height: 'calc(100% - 56.5px - 52px)',
                        }}
                    >
                        <CenteredSpinner />
                    </Box>
                ) : null
            }
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
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
        </Grid>
    )
}

export default OrdersTablet