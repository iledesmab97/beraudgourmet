'use client'

import { useEffect, useState } from 'react'
import useGetModal from '@/hooks/useGetModal'
import useGetProducts from '@/hooks/useGetProducts'
import useGetExtraIngredients from '@/hooks/useGetExtraIngredients'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import itemsJSON from '@/menuStore.json'

const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK

// import style from './ContainerItems.module.css'

function fetchPizzas() {
  return fetch(`${PATH_BACK}/pizzas`)
    .then(response => response.json())
    .then(data => {
      const pizzaList = data.map(pizza => {
          const { id, name, text, image, ingredients } = pizza
          const newPizzaData = {
            id,
            name,
            text,
            image,
            ingredients
          }
          return newPizzaData
      })
      return pizzaList
    })
}

function fetchPizzasCharacteristics({type}) {
  return fetch(`${PATH_BACK}/pizzaCosts`)
    .then(response => response.json())
    .then(data => {
      const pizzaCostsList = data.map(pizzaCost => {
        const { id, cost, costIVA, pizza, pizzaCharacteristics } = pizzaCost
        const newPizzaCost = {
          id,
          cost,
          costIVA,
          pizza,
          pizzaCharacteristics
        }
        return newPizzaCost
      })
      if (type === 'object') {
        const listCostsObject = {}
        pizzaCostsList.forEach(pizzaCost => {
          const { costIVA, pizza, pizzaCharacteristics } = pizzaCost
          const { mass, size } = pizzaCharacteristics

          if (listCostsObject[pizza]) {
            // cost per mass
            const costPerMass = {
              ...listCostsObject[pizza][size],
              [mass]: costIVA
            }
            // mass per size
            const massPerSize = {
              ...listCostsObject[pizza],
              [size]: costPerMass
            }

            listCostsObject[pizza] = massPerSize

          } else {
            // cost per mass
            const costPerMass = {
              [mass]: costIVA
            }
            // mass per size
            const massPerSize = {
              [size]: costPerMass
            }

            listCostsObject[pizza] = massPerSize
          }
        })
        return listCostsObject
      }
      return pizzaCostsList
    })
}

async function fetchExtraIngredients() {
  return fetch(`${PATH_BACK}/pizzaExtraIngredients`)
    .then(response => response.json())
    .then(data => {
      const extraIngredinetList = {}
      data.forEach(extraIngredient => {
        const {id, name, cost} = extraIngredient
        extraIngredinetList[name] = {
          id,
          name,
          price: cost
        }
      })
      return extraIngredinetList
    })
} 

async function fetchingData() {
  const pizzasList = await fetchPizzas()
  const pizzaCharacteristicsList = await fetchPizzasCharacteristics({type: 'object'})
  const totalPizzasList = pizzasList.map(pizza => ({
    ...pizza,
    price: pizzaCharacteristicsList[pizza.name]
  }))
  return totalPizzasList
}

function ContainerItems () {

  const {handleOpenModalOrder} = useGetModal({modalType:'order'})
  const { products, handleAddProductsList } = useGetProducts({type:'pizzas'})
  const { handleAddExtraIngredinetsList } = useGetExtraIngredients()

  useEffect(() => {
    fetchingData().then(data => {
      handleAddProductsList({
        type: 'pizzas',
        products: data
      })
    })
    fetchExtraIngredients()
      .then(data => {
        handleAddExtraIngredinetsList({ extraIngredientsList: data })
      })
  }, [])

  async function handleChange(event) {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch(`${PATH_BACK}/pizzas/image`, {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    console.log('data:', data)
  }

  return (
    <Grid item xs={12}>
      <Typography variant='encabezado'>
        Pizzas
      </Typography>
      <Grid container spacing={4}>
        {
          products && products.map((item, index) => (
            <Grid item key={item.name + index} xs={12} sm={6} md={4}>
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
      <input type='file' onChange={handleChange} />
    </Grid>
  )
}

export default ContainerItems
