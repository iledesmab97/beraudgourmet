
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import CrossText from '@/components/CrossText/CrossText'

function DataPrice({ orders, payment_method, checkout }) {
    return (
        <Grid
            sx={{
                width: '100%'
            }}
        >
            <Divider />
            {
                orders && orders.length && (
                    <>

                        {
                            orders.map((order, index) => (

                                <Box key={order.name + order.totalPrice + ' ' + index}>
                                    <ListItem
                                        sx={{
                                            px: '0px'
                                        }}
                                    >
                                        <ListItemText
                                            primary={
                                            <Box
                                                component={'div'}
                                                sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                                }}
                                            >
                                                { order.quantity + ' x ' + order.name + ( order.productType === 'pizza' ? ` (${order.size})` : '')}
                                                <Typography>
                                                    ${order.totalPrice}
                                                </Typography>
                                            </Box>
                                            }
                                            secondary={
                                            <>
                                                {
                                                    `${ order.productType === 'pizza' ? order.mass : ''}${ ( order.productType === 'pizza' && Object.keys(order.extra).length ? ', ' : '') + Object.keys(order.extra).map(ingredient => {
                                                        return `${order.extra[ingredient]}x ${ingredient}`
                                                    }).join(', ')
                                                    }`
                                                }
                                                {
                                                    order.ingredientsModal.map((ingredient, index) => (
                                                        <Box
                                                            key={ingredient + index}
                                                            component={'label'}
                                                        >{ order.productType === 'pizza' ? ', ' : Object.keys(order.extra).length || index > 0 ? ', ' : '' }<CrossText component={'span'}>{ingredient}</CrossText>
                                                        </Box>
                                                    ))
                                                }
                                            </>
                                            }
                                        />
                                    </ListItem>
                                    <Divider />
                                </Box>
                            ))
                        }

                        <List>
                            <ListItem
                                sx={{
                                    pr: '0px',
                                    pl: '0px',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Typography>
                                    {/* {`Total Carrito (MXN) incl. $${checkout.commissionIVA} IVA`}  */}
                                    {`Total Carrito (MXN) incl. IVA`} 
                                </Typography>
                                <Typography>
                                    ${checkout.totalPriceCar}
                                </Typography>
                            </ListItem>
                            {/* {
                                payment_method === 'card' && (
                                    <>
                                        <ListItem
                                            sx={{
                                                pr: '0px',
                                                pl: '0px',
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <Typography>
                                                Comisión Stripe:
                                            </Typography>
                                            <Typography>
                                                ${ checkout.commissionStripe }
                                            </Typography>
                                        </ListItem>
                                    </>
                                )
                            } */}
                        </List>

                    </>
                )
            }
            
            <Box
                sx={{
                    pt: '8px',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >    
                <Typography variant='title'>
                    Total
                </Typography>
                <Typography>
                    {
                        // payment_method === 'card' ?
                        //     (
                        //         `$${ Number(checkout.commissionStripe) + Number(checkout.totalPriceCar) }`
                        //     ) : (
                        //         `$${ Number(checkout.totalPriceCar) }`
                        //     )
                        `$${ Number(checkout.totalPriceCar) }`
                    }
                </Typography>
            </Box>
        </Grid>
    )
}

export default DataPrice