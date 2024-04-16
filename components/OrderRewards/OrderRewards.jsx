'use client'

import useGetModal from '@/hooks/useGetModal'
import UserSection from './UserSection'
import OrderSection from './OrderSection'
import StoreSection from './StoreSection'
import TotalPriceSection from './TotalPriceSection'
import ButtonPay from '@/components/ButtonPay/ButtonPay'

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

  const { handleOpenModal } = useGetModal({modalType: 'pay'})

  return (
    <Grid
      item
      xs={12}
      md={4}
    >
      <Container
        sx={{
          height: {
            xs: '100%',
            md: 'auto'
          },
          bgcolor: '#EAEDF2',
          pb: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
          component='form'
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
            {/* <Button
              variant='contained'
              color='secondary'
              sx={{ my:1 }}
              fullWidth
              onClick={() => {handleOpenModal('pay')}}
            >
              Siguiente paso
            </Button> */}
            <ButtonPay />
          </Box>
          
        </Box>
      </Container>
    </Grid>
  )
}

export default OrderRewards
