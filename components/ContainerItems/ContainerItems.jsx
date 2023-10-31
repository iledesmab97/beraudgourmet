'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import items from './menuStore.json'
// import style from './ContainerItems.module.css'

function ContainerItems () {
  return (
    <Grid item xs={12} md={12}>
      <Typography variant='encabezado'>
        Pizzas
      </Typography>
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
                  <Typography gutterBottom variant='title' component='h2'>
                    {item.name}
                  </Typography>
                  <Typography variant='texto'>
                    ${item.price}
                  </Typography>
                  <br/>
                  <Typography variant='texto'>
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
