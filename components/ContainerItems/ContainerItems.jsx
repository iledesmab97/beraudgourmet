'use client'

import { useEffect, useState } from 'react'
import useGetModal from '@/hooks/useGetModal'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import itemsJSON from '@/menuStore.json'

// import style from './ContainerItems.module.css'

function ContainerItems () {

  const [items, setItems] = useState([])
  const {handleOpenModalOrder} = useGetModal({modalType:'order'})

  useEffect(() => {
    fetch('http://localhost:3000/api/pizzas')
      .then(response => response.json())
      .then(data => {
        console.log('data', data)
        const pizzaList = data.map(pizza => {
            const { id, name, text, image, ingredients, price } = pizza
            return {
              id,
              name,
              text,
              image,
              ingredients,
              price
            }
        })
        console.log('newData:', pizzaList)
        return setItems(pizzaList)
      })
  }, [])

  return (
    <Grid item xs={12}>
      <Typography variant='encabezado'>
        Pizzas
      </Typography>
      <Grid container spacing={4}>
        {
          itemsJSON.map((item, index) => (
          // items.map((item, index) => (
            <Grid item key={item.name + index} xs={12} sm={6} md={4}>
              <CardActionArea
                onClick={() => {
                  console.log('itemJSON:', itemsJSON[index])
                  console.log('itemsDB', items[index])
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
                  <CardContent sx={{ flexGrow: 1}}>
                    <Typography gutterBottom variant='title' component='h2'>
                      {item.name}
                    </Typography>
                    <br/>
                    <Typography variant='texto'>
                      {item.text}
                    </Typography>
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
