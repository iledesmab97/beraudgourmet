'use client'

import { useState } from 'react';
import useGetModal from '@/hooks/useGetModal'
import FormModalDeliveryPlace from './FormModalDeliveryPlace'
import PlaceFinder from '../PlaceFinder/PlaceFinder'
import useHandlePlace from '@/hooks/useHandlePlace';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
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
  const {
    withinLimitSaved,
    inputAddress,
    distanceSaved,
    closerStore,
    inputsHome,
    place,
    placeGlobalStore,
    changeWithinLimitSaved,
    handleInputsAddress,
    handleDistanceSaved,
    handleCloserStore,
    handleInputsHome,
    handlePlaceType
  } = useHandlePlace()

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
              
              <PlaceFinder
                  withinLimitSaved={withinLimitSaved}
                  inputAddress={inputAddress}
                  distanceSaved={distanceSaved}
                  closerStore={closerStore}
                  changeWithinLimitSaved={changeWithinLimitSaved}
                  handleInputsAddress={handleInputsAddress}
                  handleDistanceSaved={handleDistanceSaved}
                  handleCloserStore={handleCloserStore}
              />
              
              {
                withinLimitSaved
                  ? <FormModalDeliveryPlace
                    inputsHome={inputsHome}
                    place={place}
                    closerStore={closerStore}
                    handleInputsHome={handleInputsHome}
                    handlePlaceType={handlePlaceType}
                  />
                  : null
              }
              
          </Box>
          <Button
              variant='contained'
              sx={{
                  alignSelf: 'flex-end'
              }}
              onClick={() => {
                console.log('placeGlobalStore:', placeGlobalStore)
                console.log('inputsHome:', inputsHome)
              }}
          >
              Aceptar
          </Button>
      </Box>
    </Modal>
  );
}