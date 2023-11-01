'use client'

import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';

import StorePickup from './StorePickup'
import HomeDelivery from './HomeDelivery'


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
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 2,
};

export default function ModalStoreDelivery() {
  const [open, setOpen] = useState(false);
  const [delivery, setDelivery] = useState('store')

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handlePlace (place) {
    setDelivery(place)
  }

  return (
    <div>
      <Button onClick={handleOpen} color='success' variant='contained'>Delivery</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant='title'
            component="h2"
            align='center'
            sx={{
              mb: 5
            }}
          >
            {delivery === 'store' ? 'Encuentre su tienda' : 'Indique el lugar de entrega'}
          </Typography>

          <ButtonGroup
            size='large'
            variant='contained'
            aria-label="contained large button group"
            sx={{
              mb: 3
            }}
          >
            <Button
              onClick={() => handlePlace('store')}
            >
              Recoger en la tienda
            </Button>
            <Button
              onClick={() => handlePlace('home')}
            >
              Entrega a domicilio
            </Button>
          </ButtonGroup>
          {
            delivery === 'store'
            ? <StorePickup />
            : <HomeDelivery />
          }
        </Box>
      </Modal>
    </div>
  );
}