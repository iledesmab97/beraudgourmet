'use client'

import { useState } from 'react';
import useGetModal from '@/hooks/useGetModal'
import AboutPizza from './AboutPizza'
import CustomizePizza from './CustomizePizza'
import useGetOrders from '@/hooks/useGetOrders';

import Image from 'next/image'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import TableHead from '@mui/material/TableHead';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 960,
  height: 600,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  // p: 4,
  borderRadius: 5
};

const INGREDIENTES = [
  {
    name: 'Aceitunas',
    price: '$25'
  },
  {
    name: 'Champiñon',
    price: '$25'
  },
  {
    name: 'Jalapeño',
    price: '$25'
  },
  {
    name: 'Cebolla',
    price: '$25'
  },
  {
    name: 'Chorizo',
    price: '$25'
  },
  {
    name: 'Jamón',
    price: '$25'
  },
]

export default function ModalChooseProduct() {

  const {open, handleCloseModal} = useGetModal({modaltype:'order'})
  const { orders, handleAddOrder } = useGetOrders()

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='stretch'
            spacing={4}
            sx={{
              width: '100%',
              height: '100%',
              marginTop: 0,
              marginLeft: 0,
            }}>

            <AboutPizza />

            <CustomizePizza />

            <Grid
              container
              direction='row'
              justifyContent='space-between'
              alignItems="center"
              sx={{
                height: '15%',
                py: 1,
                px: 5
              }}
            >
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'baseline' }}>
                <Button size='small' variant='contained'>-</Button>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  0
                </Typography>
                <Button size='small' variant='contained'>+</Button>
                <Typography id="modal-modal-description" sx={{ ml: 5 }}>
                  $0
                </Typography>
              </Box>
              <Button variant='contained' onClick={handleAddOrder}>Agregar</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}