'use client'

import { useEffect } from 'react'
import useGetModal from '@/hooks/useGetModal'
import useGetPlace from '@/hooks/useGetPlace'

import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import CircleIcon from '@mui/icons-material/Circle'
import PlaceIcon from '@mui/icons-material/Place'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import stores from '@/stores.json'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: 5,
    pb: 2,
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
  };

function ModalStoresDetail() {

    const { open, handleCloseModalStoresDetail } = useGetModal({ modalType: 'storesDetail' })
    const { place } = useGetPlace()
    if (!place.name) return

    return (
        <Modal
            open={open}
            onClose={handleCloseModalStoresDetail}
        >
            <Grid
                sx={style}
                container
            >
                <Grid item
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        variant='title'
                        component="h2"
                        align='center'
                    >
                        Elegir una tienda
                    </Typography>
                </Grid>
                <Grid
                    container
                    direction='row'
                    justifyContent='space-around'
                    alignItems='stretch'
                    spacing={1}
                    sx={{
                        height: '85%'
                    }}
                >
                    <Grid
                        item
                        xs={4}
                        sx={{
                            overflow: 'scroll',
                            height: '100%'
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
                                            stores[city].map((store, index) => (
                                                <ListItem
                                                    key={store.name + index}
                                                    sx={{
                                                        p: '0px'
                                                    }}
                                                >
                                                    <ListItemButton>
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
                    <Grid
                        item
                        xs={8}
                        sx={{
                            height: '100%',
                            overflow: 'scroll'
                        }}
                    >
                        <Box
                            sx={{
                                width: '95%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start'
                            }}
                        >
                            <Typography
                                variant='title'
                            >
                                {place.name}
                            </Typography>
                            <List>
                                <ListItem
                                    // disablePadding
                                    component={'li'}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <CircleIcon
                                            color='primary'
                                            sx={{
                                                mr: '8px'
                                            }}
                                        />
                                        <Typography
                                            component={'span'}
                                        >
                                            {place.open ? 'Abierto' : 'Cerrado'}
                                        </Typography>
                                    </Box>
                                    <Typography>
                                        {place.closeTime}
                                    </Typography>
                                </ListItem>
                                <ListItem
                                    component={'li'}
                                    // disablePadding
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <PlaceIcon sx={{ mt: '8px', mr: '8px' }} />

                                    <ListItemText
                                        primary='Dirección'
                                        secondary={
                                            <>
                                                <Typography
                                                    sx={{ display: 'inline'}}
                                                    component={'span'}
                                                    variant='body2'
                                                    color='text.primary'
                                                >
                                                    {place.place}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                                <ListItem
                                    component={'li'}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <LocalPhoneIcon sx={{ mt: '8px', mr: '8px' }} />

                                    <ListItemText
                                        primary='Telefono'
                                        secondary={
                                            <>
                                                <Typography
                                                    sx={{ display: 'inline'}}
                                                    component={'span'}
                                                    variant='body2'
                                                    color='text.primary'
                                                >
                                                    {place.phone}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                            </List>
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    gap: '8px'
                                }}
                            >
                                <Typography
                                    variant='title'
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <AccessTimeIcon />
                                    Horario para recoger
                                </Typography>
                                <TableContainer
                                    component={Paper}
                                    // sx={{
                                    //     width: '100%'
                                    // }}
                                >
                                    <Table>
                                        <TableBody>
                                            {
                                                place.pickUpSchedule.map(hour => (
                                                    <TableRow
                                                        key={hour.days + hour.hours}
                                                    >
                                                        <TableCell>{hour.days}</TableCell>
                                                        <TableCell>{hour.hours}</TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Typography
                                    variant='title'
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <AccessTimeIcon />
                                    Horario de entrega
                                </Typography>
                                <TableContainer
                                    component={Paper}
                                    // sx={{
                                    //     width: '100%'
                                    // }}
                                >
                                    <Table>
                                        <TableBody>
                                            {
                                                place.deliverySchedule.map(hour => (
                                                    <TableRow
                                                        key={hour.days + hour.hours}
                                                    >
                                                        <TableCell>{hour.days}</TableCell>
                                                        <TableCell>{hour.hours}</TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>

                    </Grid>
                </Grid>
                <Grid item
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                >
                    <Button
                        variant='contained'
                    >
                        <Typography>
                            Pedir a la tienda
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </Modal>
    )
}

export default ModalStoresDetail