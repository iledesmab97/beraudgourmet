'use client'

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer'

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
import PizzaCustomizable from '@/components/PizzaCustomizable/PizzaCustomizable'

import { useState, useEffect } from 'react'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useLoadScript } from "@react-google-maps/api"
import useGetDrawer from '@/hooks/useGetDrawer'
import useGetProducts from '@/hooks/useGetProducts'
import useHandleSteps from '@/hooks/useHandleSteps'
import useLoadData from '@/hooks/useLoadData'

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

function Menu () {

  const [totalMatches, setTotalMatches] = useState('null')
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `${GOOGLE_MAPS_API_KEY}`,
    libraries: ['places'],
  });

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const { drawer } = useGetDrawer()
  const [openOrderRewards, setOpenOrderRewards] = useState(false)
  const { totalProducts } = useGetProducts({type:'pizzas'})
  const { steps } = useHandleSteps()
  const [pizzas, setPizzas] = useState(null)
  const [salads, setSalads] = useState(null)
  const { loadData } = useLoadData()

  // Cargar los productos, ingredientes, usuarios y tiendas
  useEffect(() => {
    loadData()
  }, [])

  // Actualizar la lista de productos
  useEffect(() => {
    if (!totalProducts) return
    if (totalProducts.pizzas) {
      setPizzas(totalProducts.pizzas)
    }
    if (totalProducts.salads) {
      setSalads(totalProducts.salads)
    }
  }, [totalProducts])

  useEffect(() => {
    setOpenOrderRewards(drawer.open)
  }, [drawer])

  // Actualizar el valor de matches para las diferentes dimenciones de pantalla
  useEffect(() => {
    setTotalMatches(String(matches))
  }, [matches])

  function toggleOpenOrderRewards(value: boolean) {
    setOpenOrderRewards(value)
  }

  return (
    <Container maxWidth="lg" sx={{ mt: matches ? '100px' : '40px'}}>
      <Grid
        container
        spacing={5}
        sx={{
          pb: 3,
          position: 'relative',
          // mt: matches ? '16px' : '0px'
        }}
      >
        <PizzaCustomizable />
        <Grid
          container
          item
          xs={12}
          md={8}
          spacing={3}
        >
          {
            pizzas ? (
              <>
                <ContainerItems itemList={pizzas} title={'Nuestra selección de Pizzas'} sectionId={'pizzasSection'}/>
                <ContainerItems itemList={salads} title={'Nuestra selección de Ensaladas'} sectionId={'saladsSection'} />
              </>
            ) : null
          }
        </Grid>
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
