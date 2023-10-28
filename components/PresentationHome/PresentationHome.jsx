'use client'

import Image from 'next/image'
import { Button, Grid, Stack, Typography } from '@mui/material'
import './PresentationHome.css'

import hero from '../../../public/images/homeimg/homeimgberaud/hero.png'

const fotosRedondas = [
  '/images/homeimg/homeimgberaud/750_6063.JPG',
  '/images/homeimg/homeimgberaud/750_6069.JPG'
  // '/images/homeimg/homeimgberaud/750_6074.JPG',
  // '/images/homeimg/homeimgberaud/750_6209.JPG',
  // '/images/homeimg/homeimgberaud/750_6211.JPG',
  // '/images/homeimg/homeimgberaud/750_6214.JPG'
  // '/images/homeimg/homeimgberaud/750_6217.JPG',
  // '/images/homeimg/homeimgberaud/750_6230.JPG',
  // '/images/homeimg/homeimgberaud/750_6268.JPG',
  // '/images/homeimg/homeimgberaud/750_6236.JPG'
  // '/images/homeimg/homeimgberaud/750_6247.JPG',
  // '/images/homeimg/homeimgberaud/750_6250.JPG',
  // '/images/homeimg/homeimgberaud/750_6251.JPG',
  // '/images/homeimg/homeimgberaud/750_6263.JPG',
  // '/images/homeimg/homeimgberaud/750_6268.JPG',
  // '/images/homeimg/homeimgberaud/750_6269.JPG',
  // '/images/homeimg/homeimgberaud/750_6279.JPG',
  // '/images/homeimg/homeimgberaud/750_6284.JPG',
  // '/images/homeimg/homeimgberaud/750_6285.JPG',
  // '/images/homeimg/homeimgberaud/750_6286.JPG',
  // '/images/homeimg/homeimgberaud/750_6287.JPG',
  // '/images/homeimg/homeimgberaud/750_6294.JPG',
  // '/images/homeimg/homeimgberaud/750_6316.JPG',
  // '/images/homeimg/homeimgberaud/750_6326.JPG',
  // '/images/homeimg/homeimgberaud/750_6537.JPG',
  // '/images/homeimg/homeimgberaud/750_6540.JPG',
  // '/images/homeimg/homeimgberaud/750_6543.JPG',
  // '/images/homeimg/homeimgberaud/750_6546.JPG',
  // '/images/homeimg/homeimgberaud/5167DCF2-C868-4E87-AA4B-F8FCEE7DAE03.jpg'
]

function PresentationHome () {
  function scrollToBottom () {

  }

  function scrollToInfo () {

  }

  return (
    <Grid container spacing={2} variant='primarybackground'>
      <Grid item alignItems='center' xs={12} sm={12} md={6} paddingLeft={8}>
        <Stack justifyContent='center' alignItems='center' spacing={2}>
          <Typography variant='p' color='secondary' paddingLeft={2}>
            A lo largo de este tiempo, hemos deleitado a los paladares más
            exigentes con nuestra fusión de comida mexicana y francesa. Nuestra
            característica distintiva es la calidad de los productos que
            utilizamos en la elaboración de nuestros platillos, así como la
            excelencia en la prestación de nuestros servicios.
          </Typography>
        </Stack>
        <Stack direction='row' justifyContent='center' alignItems='center'>
          <Button variant='contained' onClick={() => scrollToBottom()}>
            <Typography fontSize='12px'>Contáctanos</Typography>
          </Button>
          <Button onClick={() => scrollToInfo()} variant='white'>
            <Typography fontSize='12px'>Más información &darr;</Typography>
          </Button>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        <Stack justifyContent='center' alignItems='center'>
          <Image
            src={hero}
            alt='hero'
            priority
          />
        </Stack>
      </Grid>

      <Grid item xs={12} md={12}>
        <Grid container variant='scrollx'>
          <Grid item xs={12} sm={12} md={4} marginLeft='1.5rem'>
            <div className='container-delivered-imgs'>
              {
                fotosRedondas.map((foto, index) => {
                  return (
                    <div className='delivered-imgs' key={`circleFoto${index}`}>
                      <Image src={foto} alt={`circleFoto${index}`} fill />
                    </div>
                  )
                })
              }
            </div>
            <Typography variant='p' color='secondary'>
              <Typography color='primary' variant='p'>
                45+
              </Typography>
              años juntando familias!
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PresentationHome
