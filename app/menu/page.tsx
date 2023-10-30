'use client'

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ContainerItems from '../../components/ContainerItems/ContainerItems'
import OrderRewards from '../../components/OrderRewards/OrderRewards'
// import style from './page.module.css'

function Menu () {
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
    </Container>
  )
}

export default Menu
