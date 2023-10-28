import { Box, Grid, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import SecurityIcon from '@mui/icons-material/Security'
import CallMadeIcon from '@mui/icons-material/CallMade'
import CleanHandsIcon from '@mui/icons-material/CleanHands'
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull'

function Values () {
  const values = [
    {
      title: 'Excelencia',
      texto:
        'Significa superar expectativas y brindar servicios de alta calidad en cada evento que organizamos.',
      icon: <ThumbUpAltIcon sx={{ fontSize: '45px' }} />
    },
    {
      title: 'Seguridad',
      texto:
        'Implementamos medidas rigurosas para proteger a nuestros clientes y garantizar su tranquilidad durante los eventos que organizamos.',
      icon: <SecurityIcon sx={{ fontSize: '45px' }} />
    },
    {
      title: 'Sofisticación',
      texto:
        'Nos esforzamos por ofrecer servicios refinados y elegantes que reflejen la calidad y el buen gusto de nuestros clientes.',
      icon: <CallMadeIcon sx={{ fontSize: '45px' }} />
    },
    {
      title: 'Limpieza',
      texto:
        'Aseguramos de mantener los más altos estándares de higiene y limpieza en todos los aspectos de nuestro trabajo.',
      icon: <CleanHandsIcon sx={{ fontSize: '45px' }} />
    },
    {
      title: 'Pasión',
      texto:
        'Nos apasiona nuestro trabajo y nos esforzamos por ofrecer servicios personalizados y únicos que reflejen la visión y la personalidad de cada cliente.',
      icon: <BatteryChargingFullIcon sx={{ fontSize: '45px' }} />
    }
  ]
  return (
    <>
      <Box style={{ paddingTop: '34px', paddingBottom: '30px' }}>
        <Stack spacing={2} justifyContent='center' alignItems='center'>
          <Typography variant='h1' color='primary' fontSize={28}>
            Valores
          </Typography>

          <Typography variant='p' color='secondary'>
            Lo que somos
          </Typography>
        </Stack>
      </Box>

      <Grid columnGap='8rem' container padding='1rem'>
        {values.map((value, index) => {
          return (
            <Grid item md={1.5} xs={12} sm={12} lg key={value.title}>
              <Stack spacing={2}>
                {value.icon}
                <Typography sx={{ mt: '5px' }} variant='pBold' color='primary'>
                  {value.title}
                </Typography>

                <Typography variant='pSpaced' color='secondary'>
                  {value.texto}
                </Typography>
              </Stack>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

export default Values
