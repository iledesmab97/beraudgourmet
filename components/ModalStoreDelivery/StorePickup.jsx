'use client'

import useGetPlace from '@/hooks/useGetPlace'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import PlaceIcon from '@mui/icons-material/Place';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ItemPlace from '../PlaceFinder/ItemPlace'

import useLocalData from '@/hooks/useLocalData'

export default function StorePickup({ storeList, handleInputsStore, inputsStore, handleCloseModal }) {

    const { handleAddPlace, handleTypeDelivery } = useGetPlace()
    const { saveLocalData } = useLocalData()

    console.log('storeList:', storeList)
    console.log('inputsStore:', inputsStore)

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
                    options={Object.keys(storeList)}
                    getOptionLabel={option => option}
                    renderOption={
                        (props, option) => (
                        <ItemPlace
                            {...props}
                            place={option}
                            key={option}
                        />
                    )}
                    onChange={handleInputsStore}
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
                    height: {
                        xs: 'auto',
                        sm: 360
                    }
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
                        height: {
                            xs: 'auto',
                            sm: '90%'
                        },
                        p: '0px',
                        position: 'static',
                        overflow: {
                            xs: 'hidden',
                            sm: 'auto'
                        }
                    }}
                >
                    {
                        storeList[inputsStore].stores.map((store, index) => (
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
                                    flexDirection: {
                                        xs: 'column',
                                        sm: 'row'
                                    },
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        width: {
                                            xs: '100%',
                                            sm: '65%'
                                        }
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
                                    flexDirection: {
                                        xs: 'row',
                                        sm: 'column'
                                    },
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-end',
                                    mr: 1
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-end',
                                        }}
                                    >
                                        <Typography
                                            variant='title'
                                        >
                                            {store.open ? `Cerramos a las:` : `Abrimos a las:` }
                                        </Typography>
                                        <Typography variant='title'>
                                            {store.open ? store.closeTime : store.openTime }
                                        </Typography>
                                    </Box>
                                    <Button
                                        variant='contained'
                                        size='small'
                                        onClick={() => {
                                            handleAddPlace({closerStore: store})
                                            saveLocalData('place', {closerStore: store})
                                            handleTypeDelivery({name: 'store', totalName: 'Recoger en tienda'})
                                            handleCloseModal('place')
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