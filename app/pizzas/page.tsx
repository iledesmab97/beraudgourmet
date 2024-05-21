'use client'

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

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
import CookieAlert from '@/components/CookiesAlert/CookieAlert'
import AlertPhoneMissing from '@/components/AlertPhoneMissing/AlertPhoneMissing'
import ShoppingCartButton from '@/components/ShoppingCartButton/ShoppingCartButton'
import AlertRecoverPassword from '@/components/AlertRecorverPassword/AlertRecorverPassword'

import { useState, useEffect } from 'react'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useLoadScript } from "@react-google-maps/api"
import useLogedUser from '@/hooks/useLogedUser'
import useLocalData from '@/hooks/useLocalData'

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

function Menu () {

  const [totalMatches, setTotalMatches] = useState('null')
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `${GOOGLE_MAPS_API_KEY}`,
    libraries: ['places'],
  });
  const { gerUserLoged } = useLogedUser()
  const { saveLocalData, getLocalData } = useLocalData()

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const [openOrderRewards, setOpenOrderRewards] = useState(false)

  useEffect(() => {
    gerUserLoged().then((response: any) => {
      const userLoged = response
      const acceptCookies = getLocalData('acceptCookies')
      if (!acceptCookies && userLoged) {
        saveLocalData('acceptCookies', true)
      }
    })
  }, [])

  useEffect(() => {
    setTotalMatches(String(matches))
  }, [matches])

  function toggleOpenOrderRewards(value: boolean) {
    setOpenOrderRewards(value)
  }

  return (
    <Container maxWidth="lg" sx={{ mt: '40px'}}>
      <Grid
        container
        spacing={5}
        sx={{
          pb: 3,
          position: 'relative'
        }}
      >
        <ContainerItems />
        {
          totalMatches === 'true' ? (
            <>
              <Drawer
                open={openOrderRewards}
                onClose={() => {toggleOpenOrderRewards(false)}}
                anchor='right'
              >
                <OrderRewards />
              </Drawer>
              <IconButton
                onClick={() => {toggleOpenOrderRewards(true)}}
                sx={{
                  position: 'absolute',
                  top: '8px',
                  right: '0',
                }}
              >
                <MenuIcon />
              </IconButton>
            </>
          ) : totalMatches === 'false' ? <OrderRewards /> : null
        }
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
      <CookieAlert />
      <AlertPhoneMissing />
      <AlertRecoverPassword />
      {
        totalMatches === 'true' ? (
          <ShoppingCartButton toggleOpenOrderRewards={toggleOpenOrderRewards} />
        ) : null
      }
    </Container>
  )
}

export default Menu
