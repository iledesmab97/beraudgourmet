import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import StarBorder from '@mui/icons-material/StarBorder'
import ListIcon from '@mui/icons-material/List';
// import InboxIcon from '@mui/icons-material/MoveToInbox'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

import { useState } from 'react'

function OrdersUser() {

    const [openCollaps, setOpenCollaps] = useState([false])

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
                        <h1>aca viene una tabla con todas las ordenes del usuario</h1>
                    </Collapse>
                </List>
            </Grid>
        </Grid>
    )
}

export default OrdersUser