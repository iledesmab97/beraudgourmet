import { FormControlLabel } from '@material-ui/core'
import {
  Box,
  Button,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import MuiPhoneNumber from 'material-ui-phone-number'
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'

export const Form = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const { register, control, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      lastName: '',
      firstName: '',
      phone: '',
      giro: ''
    }
  })
  const errors = formState.errors
  const onSubmit = (data) => {
    const infoData = data
    infoData.phone = '+' + data.phone
    setError(null)
    setSuccess(null)
    setIsSubmitting(true)

    axios

      .post('/api/subscription', infoData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(({ data }) => {
        setIsSubmitting(false)
        if (data.success === false) {
          throw new Error(data.error)
        }
        setSuccess(data.message)
      })
      .catch((error) => {
        setError(error.message)
      })
  }
  return (
    <Grid container padding='1rem'>
      <Grid item md={8} xs={12} variant='itembackground'>
        <Stack variant='stackbackground' padding='1rem'>
          <Stack spacing='8px' marginBottom='2rem'>
            <Typography variant='h3' color='#fff'>
              Contáctanos para tú siguiente evento
            </Typography>
            <Typography variant='p' color='#fff'>
              Grupo Béraud se encarga de brindarte la mejor solución
            </Typography>
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              display='flex'
              flexWrap='wrap'
              justifyContent={{
                xs: 'center',
                sm: 'center',
                md: 'center',
                lg: 'space-between'
              }}
              gap='1rem'
              sx={{
                '& > div': {
                  flexBasis: {
                    xs: '100%',
                    sm: '100%',
                    md: '100%',
                    lg: 'calc(50% - 1rem)',
                    xl: 'calc(50% - 1rem)'
                  }
                }
              }}
            >
              <Controller
                name='firstName'
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <Box
                      display='flex'
                      flexWrap='wrap'
                      justifyContent='center'
                      alignItems='center'
                    >
                      <TextField
                        {...field}
                        id='firstName'
                        placeholder='Nombre'
                        error={Boolean(errors.firstName)}
                        helperText={errors.firstName && 'Nombre es requerido'}
                        variant='standard'
                      />
                    </Box>
                  )
                }}
              />
              <Controller
                name='lastName'
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <Box
                      display='flex'
                      flexWrap='wrap'
                      justifyContent='center'
                      alignItems='center'
                    >
                      <TextField
                        {...field}
                        id='lastName'
                        placeholder='Apellido'
                        error={Boolean(errors.lastName)}
                        helperText={errors.lastName && 'Apellido es requerido'}
                        variant='standard'
                      />
                    </Box>
                  )
                }}
              />
              <Controller
                name='phone'
                control={control}
                rules={{
                  required: 'Teléfono es requerido',
                  validate: (value) => {
                    if (!value.match(/^[\d+()]{10,15}$/)) {
                      return 'El teléfono debe tener entre 10 y 15 dígitos y solo puede contener números, + y ()'
                    }
                    return true
                  }
                }}
                render={({ field }) => {
                  return (
                    <Box
                      display='flex'
                      flexWrap='wrap'
                      justifyContent='center'
                      alignItems='center'
                    >
                      <PhoneInput
                        specialLabel=''
                        country='mx'
                        enableAreaCodes
                        inputStyle={{
                          borderColor: field.touched && field.error && 'red'
                        }}
                        inputClass='react-tel-input'
                        {...field}
                      />
                    </Box>
                  )
                }}
              />
              <Controller
                name='email'
                control={control}
                rules={{
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Mail no válido'
                  }
                }}
                render={({ field }) => {
                  return (
                    <Box
                      display='flex'
                      flexWrap='wrap'
                      justifyContent='center'
                      alignItems='center'
                    >
                      <TextField
                        {...field}
                        id='email'
                        variant='standard'
                        error={Boolean(errors.email)}
                        helperText={errors.email && 'Email no es válido'}
                        placeholder='Email'
                      />
                    </Box>
                  )
                }}
              />
              <Controller
                name='giro'
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <Box
                      display='flex'
                      flexWrap='wrap'
                      justifyContent='center'
                      alignItems='center'
                    >
                      <RadioGroup {...field}>
                        <Stack direction='row'>
                          <FormControlLabel
                            className='checkBox'
                            value='social'
                            control={<Radio color='primary' />}
                            label='Social'
                          />
                          <FormControlLabel
                            className='checkBox'
                            value='corporativo'
                            control={<Radio color='primary' />}
                            label='Corporativo'
                          />
                        </Stack>
                      </RadioGroup>
                      {errors.giro && <p>Seleccionar un giro es requerido.</p>}
                    </Box>
                  )
                }}
              />
            </Box>

            <Stack
              direction='row'
              alignItems='center'
              justifyContent='center'
              width='100%'
            >
              {isSubmitting ? (
                <Button
                  flexGrow={0} // Set flexGrow to 0 to prevent the Button from growing
                  variant='standard'
                  type='submit'
                  disabled
                >
                  ¡Subscríbete!
                </Button>
              ) : (
                <Button
                  flexGrow={0} // Set flexGrow to 0 to prevent the Button from growing
                  variant='standard'
                  type='submit'
                  disabled={!formState.isValid}
                >
                  ¡Subscríbete!
                </Button>
              )}
            </Stack>
          </form>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='center'
            marginBottom='2rem'
          >
            <Typography variant='span' color='#04080d'>
              {error}
            </Typography>
            <Typography variant='span' color='#eaeef3'>
              {success}
            </Typography>
          </Stack>
        </Stack>
      </Grid>

      <Grid item md={4} className='cta-img-box' />
    </Grid>
  )
}
