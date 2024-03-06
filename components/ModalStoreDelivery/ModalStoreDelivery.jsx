'use client'

import { useState, useEffect } from 'react';
import useGetModal from '@/hooks/useGetModal'
import useHandlePlace from '@/hooks/useHandlePlace'
import useGetStoreList from '@/hooks/useGetStoreList'
import { updateStores } from '@/services/storeApi'

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
}

export default function ModalStoreDelivery() {

  const {open, handleCloseModal} = useGetModal({modalType: 'place'})

  const [delivery, setDelivery] = useState('store')

  const {
    inputsStore,
    inputsHome,
    typeLocation,
    closerStore,
    changeWithinLimitSaved,
    handleInputsStore,
    handleInputsAddress,
    handleDistanceSaved,
    handleInputsHome,
    handleTypeLocation,
    handleCloserStore
  } = useHandlePlace()

  const { storeList, handleAddStoreList } = useGetStoreList()

  useEffect(() => {
    if (storeList && Object.keys(storeList).length) return
    updateStores().then(storeList => {
      handleAddStoreList(storeList)
    })
  }, [])

  function handlePlace (place) {
    setDelivery(place)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {handleCloseModal('place')}}
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
            ?
              <StorePickup
                storeList={storeList}
                inputsStore={inputsStore}
                handleInputsStore={handleInputsStore}
                handleCloseModal={handleCloseModal}
              />
            : 
              <HomeDelivery
                handleInputsAddress={handleInputsAddress}
                inputsHome={inputsHome}
                typeLocation={typeLocation}
                withinLimitSaved={inputsHome.withinLimitSaved}
                distanceSaved={inputsHome.distanceSaved}
                closerStore={closerStore}
                changeWithinLimitSaved={changeWithinLimitSaved}
                handleDistanceSaved={handleDistanceSaved}
                handleInputsHome={handleInputsHome}
                handleTypeLocation={handleTypeLocation}
                handleCloserStore={handleCloserStore}
              />
          }
        </Box>
      </Modal>
    </div>
  );
}