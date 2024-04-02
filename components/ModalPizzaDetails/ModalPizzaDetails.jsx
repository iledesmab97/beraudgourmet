'use client'

import Image from 'next/image'
import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Input from '@mui/material/Input'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

import OrderData from '@/components/ModalOrderDetails/OrderData'
import OtherData from '@/components/ModalOrderDetails/OtherData'
import PriceData from '@/components/ModalOrderDetails/PriceData'

import { useState } from 'react'

// import styles from './ModalOrderDetails.module.css'
import dayjs from 'dayjs'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    height: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
}

function ModalPizzaDetails({ openPizzaDetail, handleOpenPizzaDetail, currentPizza }) {

    const [openColapse, setOpenColapse] = useState(false)

    function handleOpenColapse() {
        setOpenColapse(prevState => !prevState)
    }

    return (
        <Modal
            open={ openPizzaDetail }
            onClose={() => {handleOpenPizzaDetail(false)}}
        >
            <Grid
                container
                sx={style}
                alignItems={'stretch'}
            >
                <Typography
                    variant='title'
                    gutterBottom
                >
                    {`Pizza ${currentPizza.name} Nº ${currentPizza.id}`}
                </Typography>
                <Box
                    sx={{
                        height: '90%',
                        width: '100%',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: '16px',
                        pr: '8px',
                        boxSizing: 'border-box'
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '200px',
                            minHeight: '200px',
                            position: 'relative'
                        }}
                    >
                        <Image
                            src={currentPizza.image}
                            alt={currentPizza.name}
                            fill={true}
                            sizes='auto'
                            style={{
                                objectFit: 'contain'
                            }}
                        />    
                    </Box>
                    <Divider sx={{ width: '100%'}} />
                    <Input
                        fullWidth={true}
                        readOnly={true}
                        // disabled={true}
                        value={currentPizza.text}
                    />
                    <Divider sx={{ width: '100%'}} />
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            // alignItems: 'center'
                        }}
                    >
                        <Typography variant='title' sx={{ alignSelf: 'center' }}>
                            Ingredientes
                        </Typography>
                        <List
                            // sx={{
                            //     display: 'flex',
                            //     flexDirection: 'column',
                            //     alignItems: 'flex-start'
                            // }}
                        >
                            {
                                currentPizza.ingredients.map(ingredient => (
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <Input
                                                    // fullWidth={true}
                                                    readOnly={true}
                                                    // disabled={true}
                                                    value={ingredient}
                                                />
                                                // <Typography variant='p'>
                                                //     {ingredient}
                                                // </Typography>
                                            }
                                        />
                                    </ListItem>
                                ))
                            }       
                        </List>
                    </Box>
                    <Divider sx={{ width: '100%'}} />
                    <Box>
                        <Typography variant='title'>
                            Tamaños y Masas Disponibles
                        </Typography>
                        <List>
                            {
                                Object.entries(currentPizza.size).map(([size, masses]) => (
                                    <>
                                        <ListItem
                                            onClick={handleOpenColapse}
                                        >
                                            <ListItemText>
                                                <Input
                                                    readOnly={true}
                                                    value={size}
                                                />
                                            </ListItemText>
                                            {openColapse ? <ExpandLess /> : <ExpandMore />}
                                        </ListItem>
                                        <Collapse in={openColapse} timeout={'auto'}>
                                            <TableContainer>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Masa</TableCell>
                                                            <TableCell>Costo</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            Object.entries(masses).map(([mass, cost]) => (
                                                                <TableRow>
                                                                    <TableCell>
                                                                        <Input
                                                                            readOnly={true}
                                                                            value={mass}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Input
                                                                            readOnly={true}
                                                                            value={cost}
                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Collapse>
                                    </>

                                ))
                            }
                        </List>
                    </Box>
                    <Divider/>
                    {/* <h1>hola </h1>
                    <h1>hola </h1>
                    <h1>hola </h1>
                    <h1>hola </h1> */}
                    {/* <OrderData currentPizza={currentPizza} />
                    <Divider sx={{ width: '100%'}} />

                    <PriceData
                        orders={currentPizza}
                    />
                    <Divider sx={{ width: '100%'}} />
                    
                    <OtherData
                        user={currentPizza.user}
                        store={currentPizza.store}
                        dateEmited={currentPizza.applicationDate}
                        dateToRecive={currentPizza.deliveryDate}
                        deliveryInformation={currentPizza.deliveryInformation}
                    />    */}
                </Box>                
            </Grid>
        </Modal> 
    )
}

export default ModalPizzaDetails