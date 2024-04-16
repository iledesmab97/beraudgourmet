'use client'

import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ContainerItems from '../../components/ContainerItems/ContainerItems'
import OrderRewards from '../../components/OrderRewards/OrderRewards'
import ModalChooseProduct from '../../components/ModalChooseProduct/ModalChooseProduct'
import ModalStoreDelivery from '../../components/ModalStoreDelivery/ModalStoreDelivery'
import ModalDeliveryPlace from '../../components/ModalDeliveryPlace/ModalDeliveryPlace'
import ModalStoresDetail from '@/components/ModalStoresDetail/ModalStoresDetail'
import ModalUserInfo from '@/components/ModalUserInfo/ModalUserInfo'
import ModalChangePassword from '@/components/ModalChangePassword/ModalChangePassword'
import ModalChangeEmail from '@/components/ModalChangeEmail/ModalChangeEmail'
import ModalCheckoutForm from '@/components/ModalCheckoutForm/ModalCheckoutForm'
import ModalUserOrders from '@/components/ModalUserOrders/ModalUserOrders'
import ModalPDF from '@/components/ModalPDF/ModalPDF'

import { useLoadScript } from "@react-google-maps/api"
import useLogedUser from '@/hooks/useLogedUser'
import useLocalData from '@/hooks/useLocalData'

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

function Menu () {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `${GOOGLE_MAPS_API_KEY}`,
    libraries: ['places'],
  });
  const { gerUserLoged } = useLogedUser()
  useLocalData()

  useEffect(() => {
    gerUserLoged()
  }, [])

  return (
    <Container maxWidth="lg" sx={{ mt: '40px'}}>
      <Grid
        container
        spacing={5}
        sx={{
          pb: 3
        }}
      >
        <ContainerItems />
        <OrderRewards />
      </Grid>
      <ModalChooseProduct />
      <ModalStoreDelivery />
      <ModalDeliveryPlace />
      <ModalStoresDetail />
      <ModalUserInfo />
      <ModalChangePassword />
      <ModalChangeEmail />
      <ModalCheckoutForm />
      <ModalUserOrders />
      <ModalPDF />
    </Container>
  )
}

export default Menu
