import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

import { extractIngredientsOut } from '@/utils/preparingData'

function OrdersList({orders}) {
    return (
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
                                                <Typography sx={{display: 'inline'}}>{order.applicationDate}</Typography>
                                            </li>
                                            <li>
                                                <Typography component={'span'} sx={{fontWeight: 'bold'}}>Entrega: </Typography>
                                                <Typography sx={{display: 'inline'}}>{order.deliveryDate}</Typography>
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

export default OrdersList