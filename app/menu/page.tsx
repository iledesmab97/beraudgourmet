'use client'


import { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ContainerItems from '../../components/ContainerItems/ContainerItems'
import OrderRewards from '../../components/OrderRewards/OrderRewards'
import ModalChooseProduct from '../../components/ModalChooseProduct/ModalChooseProduct'
import ModalStoreDelivery from '../../components/ModalStoreDelivery/ModalStoreDelivery'
import ModalDeliveryPlace from '../../components/ModalDeliveryPlace/ModalDeliveryPlace'
// import style from './page.module.css'

function Menu () {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <ModalDeliveryPlace />
    </Container>
  )
}

export default Menu
