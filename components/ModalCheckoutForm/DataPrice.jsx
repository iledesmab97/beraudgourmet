
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
            {
                orders && orders.length && (
                    <>
                        {
                            orders.map((order, index) => (

                                <Box key={order.name + order.totalPrice + ' ' + index}>
                                    <Divider />
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
                                                { order.quantity + ' x ' + order.name + ` (${order.size})`}
                                                <Typography>
                                                    ${order.totalPrice}
                                                </Typography>
                                            </Box>
                                            }
                                            secondary={
                                            <>
                                                {
                                                    `${order.mass}${Object.keys(order.extra).map(ingredient => {
                                                        return `, ${order.extra[ingredient]}x ${ingredient}`
                                                    }).join('')
                                                    }`
                                                }
                                                {
                                                    order.ingredientsModal.map((ingredient, index) => (
                                                        <Box
                                                            key={ingredient + index}
                                                            component={'label'}
                                                        >, <CrossText component={'span'}>{ingredient}</CrossText>
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
                                    {`Total Carrito (MXN) incl. $${checkout.commissionIVA} IVA`} 
                                </Typography>
                                <Typography>
                                    ${checkout.totalPriceCar}
                                </Typography>
                            </ListItem>
                            <ListItem
                                sx={{
                                    pr: '0px',
                                    pl: '0px',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                            </ListItem>
                            {
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
                                                {/* ${ ((Number(checkout.commissionIVA) + Number(checkout.totalPriceCar)) * 0.036 + 3) * ( 1 + 0.16 ) } */}
                                                ${ checkout.commissionStripe }
                                            </Typography>
                                        </ListItem>
                                        {/* <ListItem
                                            sx={{
                                                pr: '0px',
                                                pl: '0px',
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <Typography>
                                                Total IVA Stripe:
                                            </Typography>
                                            <Typography>
                                                ${checkout.commissionStripe}
                                            </Typography>
                                        </ListItem>
                                        <ListItem
                                            sx={{
                                                pr: '0px',
                                                pl: '0px',
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <Typography>
                                                Total IVA:
                                            </Typography>
                                            <Typography>
                                                ${checkout.IVA}
                                            </Typography>
                                        </ListItem> */}
                                    </>
                                )
                            }
                        </List>

                    </>
                )
            }
            
            <Box
                sx={{
                    // pr: '0px',
                    // pl: '0px',
                    pt: '8px',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >    
                <Typography variant='title'>
                    Total
                </Typography>
                {/* <Typography variant='button' display='block' gutterBottom> */}
                <Typography>
                    {/* {
                        payment_method === 'card' ?
                            (
                                // `${checkout.totalClient}`
                                `${ Math.round((Number(checkout.commissionIVA) + Number(checkout.commissionStripe) + Number(checkout.totalPriceCar))*100)/100 }`
                            ) : (
                                `${ Number(checkout.commissionIVA) + Number(checkout.totalPriceCar) }`
                            )
                    } */}
                    {
                        payment_method === 'card' ?
                            (
                                // `${checkout.totalClient}`
                                `${ Number(checkout.commissionStripe) + Number(checkout.totalPriceCar) }`
                            ) : (
                                `${ Number(checkout.totalPriceCar) }`
                            )
                    }
                </Typography>
            </Box>
        </Grid>
    )
}

export default DataPrice