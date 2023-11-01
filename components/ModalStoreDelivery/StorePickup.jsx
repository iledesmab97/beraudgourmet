'use client'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import PlaceIcon from '@mui/icons-material/Place';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SearchIcon from '@mui/icons-material/Search';

const STORES = [
    {
      name: 'Acoxpa',
      place: 'aca viene la dirección de la tienda',
      phone: '55546153545',
      open: true,
      closeTime: 'cierra a las 11:00pm'
    },
    {
      name: 'Ajusco',
      place: 'aca viene la dirección de la tienda',
      phone: '55546153545',
      open: true,
      closeTime: 'cierra a las 11:00pm'
    },
    {
      name: 'Anaxagoras',
      place: 'aca viene la dirección de la tienda',
      phone: '55546153545',
      open: true,
      closeTime: 'cierra a las 11:00pm'
    },
    {
      name: 'Copilco',
      place: 'aca viene la dirección de la tienda',
      phone: '55546153545',
      open: true,
      closeTime: 'cierra a las 11:00pm'
    },
    {
      name: 'Destino Azcapotzalco',
      place: 'aca viene la dirección de la tienda',
      phone: '55546153545',
      open: true,
      closeTime: 'cierra a las 11:00pm'
    },
    {
      name: 'Euro Ten',
      place: 'aca viene la dirección de la tienda',
      phone: '55546153545',
      open: true,
      closeTime: 'cierra a las 11:00pm'
    },
]

export default function StorePickup() {
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

                <TextField
                    id="location"
                    label="Escriba su pueblo o ciudad"
                    type='text'
                    size='small'
                    margin='dense'
                    fullWidth
                    error={false}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />
            </Box>
            
            <Box
                sx={{
                    width:'100%',
                    height: 370,
                    overflow: 'hidden'
                }}
            >
                <Typography
                variant='title'
                sx={{
                    alignSelf: 'flex-start'
                }}
                >
                CIUDAD DE MEXICO
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
                    STORES.map((store, index) => (
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
                                >
                                    Pedir para más tarde
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