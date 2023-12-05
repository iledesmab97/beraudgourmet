'use client'

import { useState } from 'react';
import useGetModal from '@/hooks/useGetModal'

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

  const { open, handleCloseModal } = useGetModal({modalType: 'deliveryPlace'})

  const [withinLimit, setWidthinLimit] = useState(null)

  function changeWithinLimit(value) {
    setWidthinLimit(value)
  }

  return (
    <Modal
        open={open}
        onClose={handleCloseModal}
    >
      <Box sx={style}>
          <Box
              sx={{
                  width: '100%',
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
              
              {/* <PlaceFinder changeWithinLimit={changeWithinLimit} withinLimit={withinLimit} />
              
              {
                withinLimit
                  ? <FormModalDeliveryPlace />
                  : null
              } */}
              
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
  );
}