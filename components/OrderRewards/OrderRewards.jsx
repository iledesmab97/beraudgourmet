'use client'

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

  function handleChange (event) {

  }

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
          justifyContent: 'space-around'}}>
        <Box component='div' sx={{ width: '100%', position: 'relative', aspectRatio: 16/9}}>
          <Image src={logoBeraud} alt={'logoBeraud'} fill style={{ objectFit: 'contain'}}/>
        </Box>
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
          <FormControl sx={{ display: 'flex', flexDirection: 'column' }}>

            <Typography
              variant='title'
              gutterBottom>
              Iniciar Sesión / Registrarse
            </Typography>

            <TextField
              id="email"
              label='Email'
              type='email'
              InputLabelProps={{ shrink: true }}
              fullWidth
              size='small'
              margin='dense'
              helperText=''
              error={false}
              onChange={event => setEmail(event.target.value)}/>

            <TextField
              id="name"
              label="Nombre"
              type='text'
              InputLabelProps={{ shrink: true }}
              size='small'
              margin='dense'
              fullWidth
              helperText=''
              error={false}/>

            <TextField
              id="number"
              label="Número de teléfono"
              type='text'
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
              InputLabelProps={{ shrink: true }}
              size='small'
              margin='dense'
              fullWidth
              helperText=''
              error={false}/>

          </FormControl>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}>

            <Typography
              variant='title'
              gutterBottom>
              Tienda
            </Typography>

            <Button
              variant='contained'
              color='secondary'
              sx={{ my:1 }}
              fullWidth>
                Ver la lista de tiendas
            </Button>

          </Box>

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

          </Box>

          <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <TextField
                id="cupon"
                label="Cupon"
                type='text'
                InputLabelProps={{ shrink: true }}
                size='small'
                margin='dense'
                fullWidth
                helperText=''
                error={false}/>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottom: 1, borderColor: 'divider'}}>
            <Typography variant='title'>
              Total
            </Typography>
            <Typography variant='button' display='block' gutterBottom>
              $0.00
            </Typography>
          </Box>

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
