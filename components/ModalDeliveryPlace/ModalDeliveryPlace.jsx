'use client'

import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import FormModalDeliveryPlace from './FormModalDeliveryPlace'
import PlaceFinder from '../PlaceFinder/PlaceFinder'

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
  justifyContent: 'space-between',
  gap: 2,
};

export default function ModalDeliveryPlace() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} color='success' variant='contained'>Lugar de entrega</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 2
                }}
            >
                <Typography
                    id="modal-modal-title"
                    variant='title'
                    component="h2"
                    align='center'
                    sx={{
                        mb: 5
                    }}
                >
                    Dirección de entrega
                </Typography>
                
                <PlaceFinder />

                <FormModalDeliveryPlace />
                
            </Box>
            <Button
                variant='contained'
                sx={{
                    alignSelf: 'flex-end'
                }}
            >
                Aceptar
            </Button>
        </Box>
      </Modal>
    </div>
  );
}