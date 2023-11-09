'use client'

import useGetOrder from '@/hooks/useGetOrders'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function OrderSection () {

  const {orders} = useGetOrder()

  function showOrder() {
    console.log(orders)
  }

  return (
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Typography
            variant='title'
            gutterBottom>
            Pedido
          </Typography>
          <br/>
          <Typography variant='p'>
            Su pedído está vacio
          </Typography>
          <Button variant='contained' onClick={showOrder}>Mostrar pedido</Button>
        </Box>
  )
}