import Image from 'next/image'
import { Box, Grid, Stack, Typography } from '@mui/material'
import './AboutUs.css'

import breadImage from '@/public/images/homeimg/homeimgberaud/750_6546.JPG'
import plate from '@/public/images/homeimg/homeimgberaud/750_6316.JPG'
import chairs from '@/public/images/homeimg/homeimgberaud/750_6287.JPG'

function AboutUs () {
  return (
    <div>
      <Box color={"none"} style={{ paddingTop: '34px', paddingBottom: '30px', backgroundImage: 'transparent' }}>
        <Stack spacing={2} justifyContent='center' alignItems='center'>
          <Typography variant='bold' color='primary' fontSize={28}>
            Grupo BÉRAUD
          </Typography>

          <Typography variant='p' color='secondary'>
            Nuestra empresa
          </Typography>
        </Stack>
      </Box>

      <Grid container marginBottom={4} paddingLeft='10%'>
        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
        >
          <Grid item xs={6}>
            <Stack justifyContent='center' alignItems='center'>
              <Typography color='primary' marginBottom='10px'>
                Misión
              </Typography>
              <Typography color='secondary' align='center'>
                Crear eventos y experiencias de índole francés en México.
                Desarrollar y preparar deliciosas recetas para inspirar momentos
                de optimismo y felicidad.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <div className='step-img-box'>
              <Image
                src={breadImage}
                alt='bread'
                className='step-img'
              />
            </div>
          </Grid>
        </Stack>

        {/* vision */}
        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
        >
          <Grid item xs={6}>
            <div className='step-img-box'>
              <Image
                src={plate}
                alt='plate'
                className='step-img'
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <Stack>
              <Typography
                variant='pBold'
                color='primary'
                marginBottom='10px'
                align='center'
              >
                Visión
              </Typography>
              <Typography variant='p' color='secondary' align='center'>
                Ser un referente del sincretismo gastronómico y cultural entre
                Francia y México. Convertirnos en el máximo referente de eventos
                y comida franco-mexicana en México.
              </Typography>
            </Stack>
          </Grid>
        </Stack>

        {/* historia de la empresa */}
        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
        >
          <Grid item xs={6}>
            <Stack>
              <Typography
                variant='pBold'
                color='primary'
                marginBottom='10px'
                align='center'
              >
                Contenido de la marca
              </Typography>
              <Typography variant='p' color='secondary' align='center'>
                La marca es un mestizaje de la cultura mexicana y francesa. Esto
                se ve extrapolado a sus colores, decoraciones, comida, ambiente
                y comunicación. Al ser una empresa cuyo nacimiento fué inspirado
                en el sur de Francia, su comunicación incluye títulos y textos
                en Francés, sin perder de vista que el mercado meta es el
                mexicano.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <div className='step-img-box'>
              <Image
                src={chairs}
                alt='chairs'
                className='step-img'
              />
            </div>
          </Grid>
        </Stack>
      </Grid>
    </div>
  )
}

export default AboutUs
