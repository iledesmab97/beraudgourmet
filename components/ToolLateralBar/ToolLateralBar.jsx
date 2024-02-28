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

import styles from './ToolLateralBar.module.css'

const listTools = [
    'Client'
]

function ToolLateralBar({ toolSelected }) {

    return(
        <Grid
            item xs={3}
            className={styles.ToolLateralBar}
            bgcolor={'background.paper'}
        >
            <List>
                {
                    listTools.map(tool => (
                        <ListItem >
                            <ListItemButton
                                selected={ toolSelected === tool }
                                disabled={ toolSelected === tool }
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
                                    sx={ toolSelected === tool && {
                                        color: 'white'
                                    }}
                                >
                                    <GroupIcon />
                                </ListItemIcon>
                                <ListItemText primary={
                                    <Typography variant='texto'>{tool}</Typography>
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