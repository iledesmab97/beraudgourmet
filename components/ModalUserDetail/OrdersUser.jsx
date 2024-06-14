import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import StarBorder from '@mui/icons-material/StarBorder'
import ListIcon from '@mui/icons-material/List';
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import OrdersTablet from '@/components/ModalUserOrders/OrdersTablet'
import MakeOrder from './MakeOrder'

import { useEffect, useState } from 'react'

import { getAllOrdersOfUser } from '@/services/orderApi'

function OrdersUser({ user }) {

    const [openCollaps, setOpenCollaps] = useState([false, false])
    const [orders, setOrders] = useState([])

    useEffect(() => {
        getAllOrdersOfUser( user.id ).then( data => setOrders(data) )
    }, [])

    function updateOrders() {
        getAllOrdersOfUser( user.id ).then( data => setOrders(data) )
    }

    function handleOpenCollaps(index) {
        const newOpenCollaps = [...openCollaps]
        newOpenCollaps[index] = !newOpenCollaps[index]
        setOpenCollaps(newOpenCollaps)
    }

    return (
        <Grid
            container
            // alignItems={'center'}
            // wrap='nowrap'
            spacing={3}
        >
            <Grid item xs={12}>
                <Typography variant='title' >Ordenes</Typography>
            </Grid>
            <Grid item xs={12} >
                <List>
                    <ListItemButton onClick={() => {handleOpenCollaps(0)}}>
                        <ListItemIcon>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography variant='title'>
                                    Lista de Ordenes
                                </Typography>
                            }
                        />
                        { openCollaps[0] ? <ExpandLess /> : <ExpandMore /> }
                    </ListItemButton>
                    <Collapse in={openCollaps[0]} timeout='auto' >
                        <OrdersTablet orders={orders} />
                    </Collapse>
                    <ListItemButton onClick={() => {handleOpenCollaps(1)}}>
                        <ListItemIcon>
                            <AddShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography variant='title'>
                                    Agregar nueva Orden
                                </Typography>
                            }
                        />
                        { openCollaps[1] ? <ExpandLess /> : <ExpandMore /> }
                    </ListItemButton>
                    <Collapse in={openCollaps[1]} timeout='auto' >
                        <MakeOrder user={user} updateOrders={updateOrders} />
                    </Collapse>
                </List>
            </Grid>
        </Grid>
    )
}

export default OrdersUser