'use client'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { useEffect, useState } from 'react'
import useGetModal from '@/hooks/useGetModal'
import useGetProducts from '@/hooks/useGetProducts'
import useGetExtraIngredients from '@/hooks/useGetExtraIngredients'
import useHandleSteps from '@/hooks/useHandleSteps'

import { getPizzasWithCosts, getExtraIngredients } from '@/services/productApi'

function ContainerItems({ itemList, title }) {

  const {handleOpenModalOrder} = useGetModal({modalType:'order'})

  return (
    <Grid
      id='Pizza-Section'
      item
      xs={12}
    >
      <Typography
        id='title-pizzas-container'
        component={'h1'}
        variant='encabezado'
        sx={{
          width: {
            xs: '244px',
            sm: '100%'
          },
          mb: '16px',
          fontSize: {
            xs: '2.0rem',
            sm: '2.8rem'
          },
        }}
      >
        {title}
      </Typography>
      <Grid
        container
        spacing={2}
      >
        {
          itemList.filter(item => item.status === 'ACTIVE' && item.type !== 'customizable' ).map((item, index) => (
            <Grid
              item
              key={item.name + index}
              xs={12}
              sm={4}
            >
              <CardActionArea
                onClick={() => {
                  handleOpenModalOrder({item})
                }}
                sx={{
                  height: '100%'
                }}
              >
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component='img'
                    sx={{
                      width: 'auto',
                      height: '194px',
                      objectFit: 'contain',
                      mt: '16px',
                      mx: '8px'
                    }}
                    image={item.image}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant='title'
                      component='h2'
                      sx={{
                        fontSize: {
                          xs: '1.5rem',
                          sm: '1.2rem',
                        }
                      }}
                    >
                      {item.name}
                    </Typography>
                    <br/>
                    <Box
                      sx={{
                        height: '60px',
                        overflow: 'hidden',
                        position: 'relative'
                      }}
                    >
                      <Typography component={'p'} variant='texto'>
                        {item.text}
                      </Typography>
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: '0px',
                          left: '0px',
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))'
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>
          ))
        }
      </Grid>
    </Grid>
  )
}

export default ContainerItems
