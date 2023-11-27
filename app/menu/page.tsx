'use client'


import { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ContainerItems from '../../components/ContainerItems/ContainerItems'
import OrderRewards from '../../components/OrderRewards/OrderRewards'
import ModalChooseProduct from '../../components/ModalChooseProduct/ModalChooseProduct'
import ModalStoreDelivery from '../../components/ModalStoreDelivery/ModalStoreDelivery'
import ModalDeliveryPlace from '../../components/ModalDeliveryPlace/ModalDeliveryPlace'
import ModalStoresDetail from '@/components/ModalStoresDetail/ModalStoresDetail'
import ModalUserInfo from '@/components/ModalUserInfo/ModalUserInfo'
import { useLoadScript } from "@react-google-maps/api"
// import style from './page.module.css'

function Menu () {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDc8oY7zb9QuGqlkM4kJoOui0lxPv6sOAg',
    libraries: ['places'],
  });

  return (
    <Container maxWidth="lg" sx={{ mt: '40px'}}>
      <Grid
        container
        spacing={5}
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto 350px',
          pb: 3}}>
        <ContainerItems />
        <OrderRewards />
      </Grid>
      <ModalChooseProduct />
      <ModalStoreDelivery />
      {/* <ModalDeliveryPlace /> */}
      <ModalStoresDetail />
      <ModalUserInfo />
    </Container>
  )
}

export default Menu
