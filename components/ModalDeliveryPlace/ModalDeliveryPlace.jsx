'use client'

import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import TextareaAutosize from '@mui/material/TextareaAutosize';
// import Input from '@mui/material/Input';
// import { TextareaAutosize } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import TextArea from '../TextArea/TextArea'
import FormModalDeliveryPlace from './FormModalDeliveryPlace'

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

  function handlePlace (event) {
    setPlace(places[event.target.value])
  }

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

                <TextField
                    id="location"
                    label="Dirección"
                    type='text'
                    size='small'
                    margin='dense'
                    fullWidth
                    placeholder='Buscar dirección'
                    error={false}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />

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