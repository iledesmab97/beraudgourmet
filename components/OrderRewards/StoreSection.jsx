'use client'

import { useEffect, useState} from 'react'
import useGetModal from '@/hooks/useGetModal'
import useGetPlace from '@/hooks/useGetPlace'
import DateChoose from '@/components/DateChoose/DateChoose'
import TimeChoose from '@/components/TimeChoose/TimeChoose'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import PlaceIcon from '@mui/icons-material/Place';

export default function StoreSection () {

  const { handleOpenModal } = useGetModal({modalType: 'place'})
  const {place, handleRemovePlace, handleTypeDelivery} = useGetPlace()
  const closerStore = place.closerStore
  const inputsHome = place.inputsHome
  const typeDelivery = place.typeDelivery

  function handleChange(event) {
    const name = event.target.value
    if (name === 'home' && !inputsHome) {
      return handleOpenModal('deliveryPlace')
    }
    const totalName = name === 'home' ? 'Entrega a domicilio' : 'Recoger en tienda'
    handleRemovePlace({place: 'inputsHome'})
    handleTypeDelivery({name, totalName})
  }

  return (
      <Grid
        container
        spacing={1}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'

          }}
      >
        <Grid
          item
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline'
          }}
        >
          <Typography
            variant='title'
            gutterBottom>
            Tienda
          </Typography>
          {
            closerStore
            ? (
              <Typography
                variant='p'
                sx={{
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
                onClick={() => {handleOpenModal('place')}}
              >
                cambiar
              </Typography>
            ) : null
          }
        </Grid>
        {
          closerStore
          ? (
            <>
              <Grid
                item
                sx={{
                  width: '100%'
                }}
              >
                <Button
                  fullWidth
                  variant='contained'
                  onClick={() => {handleOpenModal('storesDetail')}}
                  startIcon={<PlaceIcon />}
                >
                  <Typography>
                    {closerStore.name}
                  </Typography>
                </Button>
              </Grid>
              <Grid
                item
                sx={{
                  width: '100%'
                }}
              >
                <FormControl fullWidth>
                  {/* <InputLabel id="demo-simple-select-label">Entrega a domi</InputLabel> */}
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={typeDelivery.name}
                    size='small'
                    // label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={'home'}>Entrega a domicilio</MenuItem>
                    <MenuItem value={'store'}>Recoger en tienda</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {
                inputsHome && typeDelivery.name === 'home'
                ? (
                  <>
                    <Grid
                      item
                    >
                      <Typography
                        variant='title'
                        gutterBottom
                      >
                        Entregar a
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        width: '100%'
                      }}
                    >
                      <Button
                        variant='outlined'
                        color='secondary'
                        sx={{
                          width: '100%',
                          textTransform: 'none'
                        }}
                        onClick={() => {handleOpenModal('deliveryPlace')}}
                      >
                        {`${inputsHome.street.unity}/${inputsHome.street.number} ${inputsHome.street.streetName}, ${inputsHome.inputAddress.split(",")[0]}`}
                      </Button>
                    </Grid>
                  </>
                ) : null
              }
              <Grid
                item
              >
                <DateChoose />
              </Grid>
              <Grid
                item
              >
                <TimeChoose />
              </Grid>
            </>
          ): (
            <>
              <Button
                variant='contained'
                color='secondary'
                sx={{ my:1 }}
                fullWidth
                onClick={() => {handleOpenModal('place')}}
              >
                  Ver la lista de tiendas
              </Button>
            </>
          )
        }

      </Grid>
  )
}