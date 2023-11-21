'use client'

import { useState } from 'react';
import useGetPlace from '@/hooks/useGetPlace'
import useHandlePlace from '@/hooks/useHandlePlace'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import PlaceIcon from '@mui/icons-material/Place';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SearchIcon from '@mui/icons-material/Search';
import ItemPlace from '../PlaceFinder/ItemPlace'
import stores from '@/stores.json'

export default function StorePickup({ handleInputsStore, inputsStore, handleCloseModalPlace }) {

    const { handleAddPlace } = useGetPlace()
    // const { } = useHandlePlace()

    return (
        <>
            <Box sx={{ width: '100%'}}>    
                <Typography
                variant='title'
                sx={{
                    alignSelf: 'flex-start'
                }}
                >
                BUSCAR
                </Typography>

                <Autocomplete
                    disablePortal
                    id='autocomplete-StorePickup'
                    size='small'
                    fullWidth
                    options={Object.keys(stores)}
                    getOptionLabel={option => option}
                    renderOption={
                        (props, option) => (
                        <ItemPlace
                            {...props}
                            place={option}
                            key={option}
                            // onClick={() => {calculateRoute}}
                        />
                    )}
                    // value={inputsStore.currentCity}
                    onChange={handleInputsStore}
                    // inputValue={inputsStore.inputText}
                    // onInputChange={handleInputsStoreText}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            id="location"
                            label="Escriba su pueblo o ciudad"
                            type='text'
                            size='small'
                            margin='dense'
                            fullWidth
                        />
                    )}
                />
            </Box>
            
            <Box
                sx={{
                    width:'100%',
                    height: 370,
                    overflow: 'scroll'
                }}
            >
                <Typography
                    variant='title'
                    sx={{
                        alignSelf: 'flex-start'
                    }}
                >
                {inputsStore.toUpperCase()}
                </Typography>
                <List
                    sx={{
                        width: '100%',
                        position: 'static',
                        height: '450px',
                        overflowY: 'scroll'
                    }}
                >
                    {
                        stores[inputsStore || 'Ciudad de México'].map((store, index) => (
                        <ListItem
                            key={store.name + index}
                            alignItems='flex-start'
                            sx={{
                            borderTop: 1,
                            borderColor: 'divider',
                            p: 0,
                            py: 2
                            }}
                        >

                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex'
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: '28px'
                                        }}
                                    >
                                        <PlaceIcon />
                                    </ListItemIcon>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start'
                                        }}
                                    >
                                        <Typography
                                            variant='title'  
                                        >
                                            {store.name}
                                        </Typography>
                                        <Typography
                                            variant='p'
                                            component='p'
                                            sx={{
                                            px: 0
                                            }}
                                        >
                                            {store.place}
                                        </Typography>
                                        <Box
                                            sx={{
                                            display: 'flex',
                                            alignItems: 'center'
                                            }}
                                        >
                                            <LocalPhoneIcon />
                                            <Typography
                                                variant='p'
                                            >
                                                {store.phone}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    mr: 1
                                    }}
                                >
                                    <Typography
                                        variant='title'
                                    >
                                        {store.open ? 'Abierto': 'Cerrado'}
                                    </Typography>
                                    <Typography>
                                        {store.closeTime}
                                    </Typography>
                                    <Button
                                        variant='contained'
                                        size='small'
                                        sx={{
                                            mt: 2
                                        }}
                                        onClick={() => {
                                            handleAddPlace(store)
                                            handleCloseModalPlace()
                                        }}
                                        disabled={!store.open}
                                    >
                                        Haga su pedido ahora
                                    </Button>
                                </Box>
                            </Box>
                        </ListItem>
                        ))
                    }
                </List>
            </Box>
        </>
    )
}