'use client'

import { useEffect, useState } from 'react'
import useGetModal from '@/hooks/useGetModal'
import useGetPlace from '@/hooks/useGetPlace'
import DateChoose from '@/components/DateChoose/DateChoose'
import TimeChoose from '@/components/TimeChoose/TimeChoose'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import ItemPlace from '../PlaceFinder/ItemPlace'

export default function StoreSection () {

  const { handleOpenModal } = useGetModal({modalType: 'place'})
  const dataPlace = useGetPlace()
  const place = dataPlace.place.closerStore ? dataPlace.place.closerStore : dataPlace.place
  const [isTherePlace, setIsTherePlace] = useState(false)
  const [whereDelivery, setWhereDelivery] = useState('')

  useEffect(() => {
    if (Object.keys(place).length) {
      setIsTherePlace(true)
      setWhereDelivery(() => {
        if (place.name) return 'store'
        return 'home'
      })
    }
  }, [place])

  function handleChange(event) {
    setWhereDelivery(event.target.value)
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
            isTherePlace
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
          isTherePlace
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
                  startIcon={
                    <ItemPlace
                      sx={{
                        width: '60px',
                        position: 'absolute',
                        left: '0px',
                        top: '0px'
                      }}
                    />
                  }
                  sx={{
                    // display: 'flex',
                    // justifyContent: 'flex-start',
                  }}
                >
                  <Typography>
                    {place.name}
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
                    value={whereDelivery}
                    // label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={'home'}>Entrega a domicilio</MenuItem>
                    <MenuItem value={'store'}>Recoger en tienda</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
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