'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Box, Grid, IconButton, Slide, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import './Testimonials.css'

function Testimonials () {
  const [isViewportSmall, setIsViewportSmall] = useState(false)
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  function handleItemChange () {

  }

  function handleSlideExited () {

  }

  const testimonios = [
    {
      imgPath: '/images/homeimg/customers/nicole.jpg',
      testimonio:
            'Son la mejor banquetera. Mi evento salió increíble, a todo el mundo le encantó todo.',
      autor: 'Nicole'
    },
    {
      imgPath: '/images/homeimg/customers/anapaularivas.jpg',
      testimonio:
            'Comimos deliciosos platillos de la gastronomía francesa! Gracias Beraud Banquetes!',
      autor: 'Ana Paula Rivas'
    },
    {
      imgPath: '/images/homeimg/customers/customer-1.jpg',
      testimonio:
            'Excelente servicio, todo muy bien hecho excelente calidad de comida y atención. Muy recomendable.',
      autor: 'Patricia'
    },
    {
      imgPath: '/images/homeimg/customers/customer-4.jpg',
      testimonio:
            'Todos mis colegas encantados con el servicio y la comida exquisita. Muchas Gracias Béraud Banquetes.',
      autor: 'Philippe'
    }
  ]

  const gallery = [
    {
      id: 1,
      image: '/images/homeimg/homeimgberaud/750_6063.JPG',
      caption: 'Item 1'
    },
    {
      id: 2,
      image: '/images/homeimg/homeimgberaud/5167DCF2-C868-4E87-AA4B-F8FCEE7DAE03.jpg',

      caption: 'Item 2'
    },
    {
      id: 3,
      image: '/images/homeimg/homeimgberaud/750_6230.JPG',

      caption: 'Item 3'
    },
    {
      id: 4,
      image: '/images/homeimg/homeimgberaud/750_6209.JPG',

      caption: 'Item 1'
    }
    // {
    //   id: 5,
    //   image: '/images/homeimg/homeimgberaud/750_6259.JPG',

    //   caption: 'Item 2'
    // },
    // {
    //   id: 6,
    //   image: '/images/homeimg/homeimgberaud/750_6214.JPG',

    //   caption: 'Item 3'
    // },
    // {
    //   id: 7,
    //   image: '/images/homeimg/homeimgberaud/750_6546.JPG',

    //   caption: 'Item 1'
    // },
    // {
    //   id: 8,
    //   image: '/images/homeimg/homeimgberaud/750_6230.JPG',

    //   caption: 'Item 2'
    // },
    // {
    //   id: 9,
    //   image: '/images/homeimg/homeimgberaud/750_6074.JPG',

    //   caption: 'Item 3'
    // },
    // {
    //   id: 10,
    //   image: '/images/homeimg/homeimgberaud/750_6236.JPG',

    //   caption: 'Item 1'
    // },
    // {
    //   id: 11,
    //   image: '/images/homeimg/homeimgberaud/750_6247.JPG',

    //   caption: 'Item 2'
    // },
    // {
    //   id: 12,
    //   image: '/images/homeimg/homeimgberaud/750_6250.JPG',

    //   caption: 'Item 3'
    // }
  ]

  return (
    <>
      <Box style={{ paddingTop: '34px', paddingBottom: '30px' }}>
        <Stack spacing={2} justifyContent='center' alignItems='center'>
          <Typography variant='h1' color='primary' fontSize={28}>
            Testimonios
          </Typography>

          <Typography variant='p' color='secondary'>
            La experiencia
          </Typography>
        </Stack>
      </Box>

      <Grid container>
        <Grid item md={6} lg={6} xl={6} padding='1rem'>
          <Grid container>
            {testimonios.map((testimonio, index) => {
              return (
                <Grid item md={6} key={`testimonio${index}`}>
                  <figure className='testimonial'>
                    <div className='container-image-testimonio'>
                      <Image
                        src={testimonio.imgPath}
                        alt={`person${index}`}
                        className='testimonial-img'
                        fill
                      />
                    </div>
                    <Typography variant='p' color='secondary'>
                      {testimonio.testimonio}
                    </Typography>
                    <Box m={2.8}>
                      <Typography variant='pTestimonios' color='secondary'>
                        &mdash; {testimonio.autor}
                      </Typography>
                    </Box>
                  </figure>
                </Grid>
              )
            })}
          </Grid>
        </Grid>

        <Grid item md={6} lg={6} xl={6}>
          {isViewportSmall
            ? (
              <Grid
                container
                direction='row'
                alignItems='center'
                position='relative'
              >
                <div className='buttonSlideLeft'>
                  <IconButton
                    color='white'
                    onClick={() =>
                      handleItemChange(
                        (activeItemIndex - 1 + gallery.length) % gallery.length
                      )}
                  >
                    <ArrowBack />
                  </IconButton>
                </div>
                <Grid item xs={12}>
                  <Slide
                    direction='left'
                    in
                    timeout={500}
                    onExited={handleSlideExited}
                  >
                    <img
                      src={gallery[activeItemIndex].image}
                      alt={gallery[activeItemIndex].caption}
                    />
                  </Slide>
                </Grid>
                <div className='buttonSlideRight'>
                  <IconButton
                    onClick={() =>
                      handleItemChange((activeItemIndex + 1) % gallery.length)}
                  >
                    <ArrowForward />
                  </IconButton>
                </div>
              </Grid>
              )
            : (
              <Grid container>
                {gallery.map((foto, index) => {
                  return (
                    <Grid item md={4} key={`galery${index}`}>
                      <figure className='gallery-item'>
                        <Image
                          src={foto.image}
                          alt={`gallery${index}`}
                          fill
                        />
                        {/* <img src={foto.image} /> */}
                      </figure>
                    </Grid>
                  )
                })}
              </Grid>
              )}
        </Grid>
      </Grid>
    </>
  )
}

export default Testimonials
