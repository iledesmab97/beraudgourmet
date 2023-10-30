'use client'

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ContainerItems from '../../components/ContainerItems/ContainerItems'
import OrderRewards from '../../components/OrderRewards/OrderRewards'
// import style from './page.module.css'

function Menu () {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={5}>
        <ContainerItems />
        <OrderRewards />
      </Grid>
    </Container>
  )
}

export default Menu
