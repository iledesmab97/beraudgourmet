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
import WhatsappButton from '@/components/WhatsappButton/WhatsappButton'
import { useLoadScript } from "@react-google-maps/api"
import Cookies from 'js-cookie'
import { fetchwhoAmI } from '@/app/api/userApi'
import useGetUser from '@/hooks/useGetUser';
import {userDataFromBackToFront} from '@/services/preparingData'

const roles = ['root', 'admin', 'client']

async function getUserLoged(updateUser) {
  const userLogued = JSON.parse(localStorage.getItem('userLoged'))
  if (!userLogued) return
  const userBack = await fetchwhoAmI()
  if (!userBack) return
  const userDataFront = userDataFromBackToFront(userBack)
  updateUser(userDataFront)
}

function Menu () {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDc8oY7zb9QuGqlkM4kJoOui0lxPv6sOAg',
    libraries: ['places'],
  });
  const { handleAddUser } = useGetUser()

  useEffect(() => {
    getUserLoged(handleAddUser)
  }, [])

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
      <WhatsappButton />
      <ModalChooseProduct />
      <ModalStoreDelivery />
      <ModalDeliveryPlace />
      <ModalStoresDetail />
      <ModalUserInfo />
      <ModalChangePassword />
      <ModalChangeEmail />
      <ModalCheckoutForm />
    </Container>
  )
}

export default Menu
