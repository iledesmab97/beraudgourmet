'use client'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/List'
import CircleIcon from '@mui/icons-material/Circle'
import ListItemText from '@mui/material/ListItemText'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import PlaceIcon from '@mui/icons-material/Place'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

export default function DetailStore({ currentStore }) {
    return (
        <Grid
            item
            xs={8}
            pr={1}
            sx={{
                height: '100%',
                overflowY: 'auto'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'
                }}
            >
                <Typography
                    variant='title'
                >
                    {currentStore.name}
                </Typography>
                <List>
                    <ListItem
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
                                color={currentStore.open ? 'primary' : 'secondary'}
                                sx={{
                                    mr: '8px'
                                }}
                            />
                            <Typography
                                component={'span'}
                            >
                                {currentStore.open ? 'Abierto' : 'Cerrado'}
                            </Typography>
                        </Box>
                        <Typography>
                            {currentStore.closeTime}
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
                                        {currentStore.place}
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
                                        {currentStore.phone}
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
                                    currentStore.pickUpSchedule.map(hour => (
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
                                    currentStore.deliverySchedule.map(hour => (
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
    )
}