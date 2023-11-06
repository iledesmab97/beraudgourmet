'use client'

import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import PlaceIcon from '@mui/icons-material/Place';
import Typography from '@mui/material/Typography';

export default function ItemPlace(props) {
    return (
        <ListItem {...props}>
            <ListItemIcon>
                <PlaceIcon />
                <Typography variant='p' component='p'>
                    {props.place}
                </Typography>
            </ListItemIcon>
        </ListItem>
    )
}