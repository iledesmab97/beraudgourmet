'use client'

import UserSection from './UserSection'
import OrderSection from './OrderSection'
import StoreSection from './StoreSection'
import TotalPriceSection from './TotalPriceSection'

import Image from 'next/image'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import style from './OrderRewards.module.css'
import logoBeraud from '@/public/images/homeimg/homeimgberaud/logoBeraud.png'

function OrderRewards () {

  function handleSubmit() {

  }

  return (
    <Grid
      item
      sx={{ width: '100%' }}
      >
      <Container
        sx={{
          bgcolor: '#EAEDF2',
          pb: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around'}}
      >
        <Image
          src={logoBeraud}
          alt={'logoBeraud'}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            aspectRatio: 3/2
          }}
        />
        <Box
          component='form'
          onSubmit={handleSubmit}
          noValidate
          autoComplete='off'
          sx={{
            '& > :not(style)': { m: 1,
            width: '25ch'
          }
          }}
        >
          <UserSection />

          <StoreSection />

          <OrderSection />

          <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <TextField
                id="cupon"
                label="Cupon"
                type='text'
                size='small'
                margin='dense'
                fullWidth
                helperText=''
                error={false}/>
          </Box>

          <TotalPriceSection />

          <Box>
            <Button
              variant='contained'
              color='secondary'
              sx={{ my:1 }}
              fullWidth
              >Siguiente paso</Button>
          </Box>
          
        </Box>
      </Container>
    </Grid>
  )
}

export default OrderRewards
