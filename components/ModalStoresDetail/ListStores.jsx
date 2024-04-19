'use client'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Divider from '@mui/material/Divider'

function ListStores({ handleCurrentStoreDetail , place, stores }) {
    return (
        <Grid
            item
            sm={4}
            pr={1}
            sx={{
                overflowY: {
                    xs: 'none',
                    sm: 'auto'
                },
                height: 'fit-content',
                maxHeight: {
                    xs: 'none',
                    sm: '100%'
                }
            }}
        >
            {
                Object.keys(stores).map(city => (
                    <Box key={city}>
                        <Typography>
                            {city.toUpperCase()}
                        </Typography>
                        <List>
                            {
                                stores[city].stores.map((store, index) => (
                                    <ListItem
                                        key={store.name + index}
                                        sx={{
                                            p: '0px',
                                        }}
                                    >
                                        <ListItemButton
                                            onClick={() => {handleCurrentStoreDetail(stores[city].stores[index])}}
                                            className={ place.name === store.name ? 'Mui-selected' : null }
                                        >
                                            <Typography>
                                                {store.name}
                                            </Typography>
                                        </ListItemButton>
                                    </ListItem>
                                ))
                            }
                        </List>
                        <Divider/>
                    </Box>
                ))
            }
        </Grid>
    )
}

export default ListStores