'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import items from './menuStore.json'
import style from './ContainerItems.module.css'

function ContainerItems () {
  return (
    <Grid item xs={12} md={8.5}>
      <h1 className={style.ContainerItemsTitle}>
        <strong>Pizzas</strong>
      </h1>
      <Grid container spacing={4}>
        {
          items.slice(0,5).map(item => (
            <Grid item key={item.name} xs={12} sm={6} md={4}>
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
                  <Typography gutterBottom variant='h5' component='h2'>
                    {item.name}
                  </Typography>
                  <Typography>
                    ${item.price}
                  </Typography>
                  <Typography>
                    {item.text}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </Grid>
  )
}

export default ContainerItems
