'use client'

import { useEffect, useState } from 'react'
import useGetModal from '@/hooks/useGetModal'
import useGetProducts from '@/hooks/useGetProducts'
import useGetExtraIngredients from '@/hooks/useGetExtraIngredients'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import itemsJSON from '@/menuStore.json'

import { getPizzasWithCosts, getExtraIngredients } from '@/services/productApi'
import { fetchwhoAmI } from '@/services/userApi'

// import style from './ContainerItems.module.css'

function updatePrice(price) {
  const priceWithIVA = Number(price) * 1.16
  const priceWithIVA_and_ComissionStripe = (priceWithIVA * 0.036 + 3) * 1.16
  return Math.ceil(priceWithIVA + priceWithIVA_and_ComissionStripe)
}

function ContainerItems () {

  const {handleOpenModalOrder} = useGetModal({modalType:'order'})
  const { products, handleAddProductsList } = useGetProducts({type:'pizzas'})
  const { extraIngredients, handleAddExtraIngredinetsList } = useGetExtraIngredients()

  useEffect(() => {
    if (products && products.pizzas) return
    getPizzasWithCosts()
      .then(data => {
        const productList = data.filter(item => item.status === 'ACTIVE')
        handleAddProductsList({
          type: 'pizzas',
          products: productList
        })
      })
    if (extraIngredients && Object.keys(extraIngredients).length) return
    getExtraIngredients()
      .then(data => {
        handleAddExtraIngredinetsList({ extraIngredientsList: data })
      })
  }, [])

  return (
    <Grid
      id='Pizza-Section'
      item
      xs={12}
      md={8}
    >
      <Typography  variant='encabezado'>
        Pizzas
      </Typography>
      <Grid
        container
        spacing={2}
      >
        {
          products && products.map((item, index) => (
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
                    component='div'
                    sx={{
                      pt: '100%'
                    }}
                    image={item.image}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                    }}
                  >
                    <Typography gutterBottom variant='title' component='h2'>
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
                      <Typography variant='texto'>
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
        {/* <Button
          onClick={() => {
            fetchwhoAmI().then(data => console.log('data:', data))
          }}
        >
          Quien soy
        </Button> */}
    </Grid>
  )
}

export default ContainerItems
