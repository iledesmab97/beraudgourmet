'use client'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography';

import InboxIcon from '@mui/icons-material/Inbox'
import GroupIcon from '@mui/icons-material/Group';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';

import styles from './ToolLateralBar.module.css'

const listTools = [
    {
        name: 'Orders',
        icon: GroupIcon
    },
    {
        name: 'Pizzas',
        icon: LocalPizzaIcon
    }
]

function ToolLateralBar({ toolSelected, handleToolSelected }) {

    return(
        <Grid
            item xs={3}
            className={styles.ToolLateralBar}
        >
            <List>
                {
                    listTools.map(tool => (
                        <ListItem key={tool.name} >
                            <ListItemButton
                                selected={ toolSelected === tool.name }
                                disabled={ toolSelected === tool.name }
                                sx={{
                                    borderRadius: '10px',
                                    '&.Mui-selected': {
                                        bgcolor: '#295386',
                                        color: 'white'
                                    },
                                    '&.Mui-disabled': {
                                        opacity: 1
                                    }
                                }}
                            >
                                <ListItemIcon
                                    sx={ toolSelected === tool.name ? {
                                        color: 'white'
                                    }: null}
                                >
                                    <tool.icon />
                                </ListItemIcon>
                                <ListItemText primary={
                                    <Typography variant='texto'>{tool.name}</Typography>
                                }
                                />
                            </ListItemButton>
                        </ListItem>
                    ))   
                }
            </List>
        </Grid>
    )
}

export default ToolLateralBar