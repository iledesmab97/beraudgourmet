'use client'

import { useState } from 'react';
import useGetModal from '@/hooks/useGetModal'
import useHandlePlace from '@/hooks/useHandlePlace';

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

  const {open, handleCloseModalPlace} = useGetModal({modalType: 'place'})

  const [delivery, setDelivery] = useState('store')

  const { inputsStore, handleInputsStore , handleInputsHome } = useHandlePlace()

  function handlePlace (place) {
    setDelivery(place)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseModalPlace}
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
              sx={delivery === 'store'
                ? {
                  backgroundColor: 'rgb(28, 58, 93)'
                }: {}
              }
            >
              Recoger en la tienda
            </Button>
            <Button
              onClick={() => handlePlace('home')}
              sx={delivery === 'home'
                ? {
                  backgroundColor: 'rgb(28, 58, 93)'
                }: {}
              }
            >
              Entrega a domicilio
            </Button>
          </ButtonGroup>
          {
            delivery === 'store'
            ? <StorePickup
                inputsStore={inputsStore}
                handleInputsStore={handleInputsStore}
              />
            : <HomeDelivery />
          }
        </Box>
      </Modal>
    </div>
  );
}