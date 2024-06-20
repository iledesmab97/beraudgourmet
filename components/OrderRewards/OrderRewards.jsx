'use client'

import Image from 'next/image'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import UserSection from './UserSection'
import OrderSection from './OrderSection'
import StoreSection from './StoreSection'
import TotalPriceSection from './TotalPriceSection'
import ButtonPay from '@/components/ButtonPay/ButtonPay'
import SliceProgressBar from '@/components/SliceProgressBar/SliceProgressBar'

import useGetModal from '@/hooks/useGetModal'

import style from './OrderRewards.module.css'
import logoBeraud from '@/public/images/homeimg/homeimgberaud/logoBeraud.png'

function OrderRewards () {

  const { handleOpenModal } = useGetModal({modalType: 'pay'})

  return (
    <Grid
      item
      xs={12}
      // xs={12}
      md={4}
    >
      <Container
        sx={{
          position: 'relative',
          height: {
            xs: '100%',
            md: 'auto'
          },
          minWidth: {
            xs: '300px',
            sm: '315px',
            md: '300px'
          },
          bgcolor: '#EAEDF2',
          pb: 2,
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
          alignItems: 'flex-end',
          justifyContent: 'flex-start'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '90%',
            aspectRatio: 16/9,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'auto',
          }}
        >
          <Image
            src={logoBeraud}
            alt={'logoBeraud'}
            fill={true}
            style={{
              objectFit: 'contain',
            }}
          />
        </Box>
        <Box
          id='OrderRewards-form-container'
          component='form'
          noValidate
          autoComplete='off'
          sx={{
            position: 'relative',
            '& > :not(style)': {
              m: 1,
              width: '25ch'
            }
          }}
        >

          <UserSection />

          <OrderSection />

          <Box
            sx={{
              position: 'relative'
            }}
          >

            <StoreSection />

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

            <SliceProgressBar section={'store'} />
          </Box>


          <Box
            id='ButtonPay-container'
            sx={{
              position: 'relative'
            }}
          >
            <ButtonPay />
            <SliceProgressBar section={'pay'} />
          </Box>
        </Box>
      </Container>
    </Grid>
  )
}

export default OrderRewards
