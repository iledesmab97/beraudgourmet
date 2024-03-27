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
import useGetUser from '@/hooks/useGetUser'
import useGetModal from '@/hooks/useGetModal'
import { modalSaved } from '@/utils/modal'
import { lookingForUserLoged, saveToken, saveUserLogedInLocalStorage } from '@/services/userApi'


function Menu ({ searchParams }: { searchParams: any }) {

  const userJWT = searchParams

  if (Object.keys(userJWT).length && typeof window !== 'undefined') {
    // const expires = Number(userJWT["Max-Age"])/(1000*60*60*24)
    saveToken( userJWT )
  }

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
    if (typeof window === 'undefined') return
    const loged = localStorage.getItem('loged')
    if (!loged) return
    lookingForUserLoged()
      .then((user: any) => {
        if (!user) return false
        if (user.message) throw new Error(user.message)
        handleAddUser(user)
        return true
      })
      .then((response) => {
        if (!response) return
        const modal = modalSaved()
        if (modal) {
          handleOpenModal(modal)
          localStorage.removeItem('modalToOpen')
        }
      })
      .catch(error => alert(error.message))
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
