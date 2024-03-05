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

import { useLoadScript } from "@react-google-maps/api"
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'
import useGetUser from '@/hooks/useGetUser';
import useGetModal from '@/hooks/useGetModal'
import {userDataFromBackToFront} from '@/utils/preparingData'
import { modalSaved } from '@/utils/modal'


function lookingForUserLoged(updateUser){
  const tokenUser = Cookies.get('tokenUser')
  if (!tokenUser) return false
  try {
    const dataUser = jwt.decode(tokenUser)
    const userDataFront = userDataFromBackToFront(dataUser)
    updateUser(userDataFront)
    return true
  } catch(error) {
    return alert('error:', error.message)
  }
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
  const { handleOpenModal } = useGetModal({ modalType: 'userOrders' })

  useEffect(() => {
    const userLoged = lookingForUserLoged(handleAddUser)
    if (userLoged) {
      const modal = modalSaved()
      handleOpenModal(modal)
      localStorage.removeItem('modalToOpen')
    }
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
      <ModalChooseProduct />
      <ModalStoreDelivery />
      <ModalDeliveryPlace />
      <ModalStoresDetail />
      <ModalUserInfo />
      <ModalChangePassword />
      <ModalChangeEmail />
      <ModalCheckoutForm />
      <ModalUserOrders />
    </Container>
  )
}

export default Menu
