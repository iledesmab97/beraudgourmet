import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import TablePagination from "@mui/material/TablePagination";

import CenteredSpinner from '../LoadingComponets/CenteredSpinner';
import TablePaginationActions from "@/components/TablePaginationActions/TablePaginationActions"

import { extractIngredientsOut } from '@/utils/preparingData'
import { dateStringToDate } from '@/utils/hours';

function OrdersList({ orders, loading, pagination }) {
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
            {
                loading ? (
                    <Box
                        sx={{
                            height: 'calc(100% - 56.5px - 52px)',
                        }}
                    >
                        <CenteredSpinner />
                    </Box>
                ) : (
                    <List
                        sx={{
                            overflowY: 'auto'
                        }}
                    >
                        {
                            orders.map(order => (
                                <>
                                    <ListItem alignItems={'flex-start'}>
                                        <ListItemText
                                            primary={
                                                <>
                                                    <Typography component={'span'} sx={{fontWeight: 'bold'}}>Estatus: </Typography>
                                                    <Typography
                                                        component={'span'}
                                                        sx={ order.closed ? {color: 'green'} : {color: 'red'} }
                                                    >
                                                        {order.closed ? 'Entregado' : 'Pendiente'}
                                                    </Typography>
                                                </>
                                            }
                                            secondary={
                                                <>
                                                    <ul
                                                        style={{
                                                            listStyleType: 'disc',
                                                            paddingLeft: '16px'
                                                        }}
                                                    >
                                                        <li>
                                                            <Typography component={'span'} sx={{fontWeight: 'bold'}}>Pedido: </Typography>
                                                            <Typography
                                                                dangerouslySetInnerHTML={{
                                                                __html: order.itemsxOrder.map(item => {
                                                                    const ingredinetsOut = extractIngredientsOut(item.description)
                                                                    if (!ingredinetsOut.length) return item.description
                                                                    const index = item.description.indexOf(', ~')
                                                                    return (
                                                                        item.description.slice(0, index) + ingredinetsOut.map( ingredient => `, <span style="text-decoration: line-through">${ingredient}</span>` ).join('')
                                                                    )
                                                                }).join('; ')
                                                            }}
                                                                sx={{
                                                                    display: 'inline'
                                                                }}
                                                            />
                                                        </li>
                                                        <li>
                                                            <Typography component={'span'} sx={{fontWeight: 'bold'}}>Emición: </Typography>
                                                            <Typography sx={{display: 'inline'}}>{getFormatOrderDate( order.applicationDate )}</Typography>
                                                        </li>
                                                        <li>
                                                            <Typography component={'span'} sx={{fontWeight: 'bold'}}>Entrega: </Typography>
                                                            <Typography sx={{display: 'inline'}}>{getFormatOrderDate( order.deliveryDate )}</Typography>
                                                        </li>
                                                        <li>
                                                            <Typography component={'span'} sx={{fontWeight: 'bold'}}>Precio($): </Typography>
                                                            <Typography sx={{display: 'inline'}}>{order.totalCost}</Typography>
                                                        </li>
                                                    </ul>
                                                    <br />
                                                </>
                                            }
                                        />
                                    </ListItem>
                                    <Divider />
                                </>
                            ))
                        }
                    </List>
                )
            }
            <Box
                sx={{
                    width: "100%"
                }}
            >
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
                    labelRowsPerPage={""}
                    ActionsComponent={TablePaginationActions}
                    sx={{
                        "& .MuiTablePagination-toolbar": {
                            p: 0
                        },
                        "& .MuiTablePagination-input": {
                            ml: "0px",
                            mr: "8px"
                        },
                        "& .MuiBox-root": {
                            ml: "0px"
                        }
                    }}
                />
            </Box>
        </Grid>
    )
}

export default OrdersList