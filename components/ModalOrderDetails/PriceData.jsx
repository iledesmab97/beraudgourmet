
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import CrossText from '@/components/CrossText/CrossText'
import Collapse from '@mui/material/Collapse'

import { useState } from 'react'

import { extractElements, descriptionWithoutIngredientsOut } from '@/utils/preparingData'

function PriceData({ orders }) {

    const [subElements, setSubElements] = useState(() => {
        const listOrders = orders.itemsxOrder.map(order => extractElements(order.description))
        return listOrders
    })
    const [openCollapse, setOpenCollapse] = useState(() => orders.itemsxOrder.map(order => false))

    function handleChangeCollapse(indexCollapse) {
        const newOpenCollapse = openCollapse.map((element, index) => index === indexCollapse ? !element : element )
        setOpenCollapse(newOpenCollapse)
    }

    return (
        <Grid
            sx={{
                width: '100%'
            }}
        >
            {
                orders.itemsxOrder && (
                    <>
                        {
                            orders.itemsxOrder.map((order, index) => (
                                <Box key={order.id}>
                                    <List key={order.id}>
                                        <ListItem
                                            sx={{
                                                px: '0px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <ListItemText
                                                onClick={() => {
                                                    handleChangeCollapse(index)
                                                }}
                                                primary={
                                                <Box
                                                    component={'div'}
                                                    sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between'
                                                    }}
                                                >
                                                    <Typography>
                                                        {descriptionWithoutIngredientsOut(order.description)}
                                                    </Typography>
                                                    <Typography>
                                                        ${order.totalCostByItem}
                                                    </Typography>
                                                </Box>
                                                }
                                            />
                                        </ListItem>
                                        <Divider />
                                    </List>

                                    <Collapse in={openCollapse[index]} timeout={'auto'} unmountOnExit >
                                        <List>
                                            <ListItemText
                                                primary={
                                                    <>
                                                        <Box
                                                            component={'div'}
                                                            sx={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between'
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    fontSize: '0.875rem',
                                                                    color: 'rgba(0, 0, 0, 0.6)'
                                                                }}
                                                            >
                                                                {'1 ' + subElements[index].genericPizza.slice(1)}
                                                            </Typography>
                                                            <Typography
                                                                sx={{
                                                                    fontSize: '0.875rem',
                                                                    color: 'rgba(0, 0, 0, 0.6)'
                                                                }}
                                                            >
                                                                ${order.costPerUnity - order.extraIngredients.reduce((acc, cur) => acc + Number(cur.cost) , 0)}
                                                            </Typography>
                                                        </Box>
                                                        {
                                                            order.extraIngredients.map(extraIngredient => (
                                                                <Box
                                                                    key={extraIngredient.name}
                                                                    component={'div'}
                                                                    sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between'
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: '0.875rem',
                                                                            color: 'rgba(0, 0, 0, 0.6)'
                                                                        }}
                                                                    >
                                                                        {`${extraIngredient.quantity} x ${extraIngredient.name} ($${extraIngredient.costPerUnit} c/u)`}
                                                                    </Typography>
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: '0.875rem',
                                                                            color: 'rgba(0, 0, 0, 0.6)'
                                                                        }}
                                                                    >
                                                                        ${extraIngredient.cost}
                                                                    </Typography>
                                                                </Box>
                                                            ))
                                                        }
                                                    </>
                                                }
                                            />
                                        </List>
                                    </Collapse>
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
                                    {`Total Carrito (MXN) incl. IVA`} 
                                </Typography>
                                <Typography>
                                    ${orders.totalCostByItems}
                                </Typography>
                            </ListItem>
                            {
                                orders.paymentMethod === 'stripe' && (
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
                                                ${ orders.commissions }
                                            </Typography>
                                        </ListItem>
                                    </>
                                )
                            }
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
                    {`$${orders.totalCost}`}
                </Typography>
            </Box>
        </Grid>
    )
}

export default PriceData