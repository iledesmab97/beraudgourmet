'use client'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { ArrowBack, ArrowForward } from '@mui/icons-material';

import useGetModal from '@/hooks/useGetModal';

import { useTheme, useMediaQuery } from '@mui/material';

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <IconButton
      style={{display: 'block', position: 'absolute', top: '88%', right: '30%', transform: 'translateX(50%)' }}
      onClick={onClick}
    >
      <ArrowForward />
    </IconButton>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <IconButton
      style={{ display: 'block', position: 'absolute', top: '88%', left: '30%', transform: 'translateX(-50%)', zIndex: 1 }}
      onClick={onClick}
    >
      <ArrowBack />
    </IconButton>
  );
};
function ContainerItems({ itemList, title, sectionId }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: '50px',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  const {handleOpenModalOrder} = useGetModal({modalType:'order'})

  return (
    <Grid
      id={sectionId}
      item
      xs={12}
    >
      <Typography
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
      {isSmallScreen && itemList.length >= 2 ? (
        <Slider {...settings}>
          {itemList.filter(item => item.status === 'ACTIVE' && item.type !== 'customizable').map((item, index) => (
            <div key={item.name + index}>
              <CardActionArea
                onClick={() => {
                  handleOpenModalOrder({ item });
                }}
                sx={{
                  height: '100%'
                }}
              >
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                  <CardContent sx={{ flexGrow: 1 }}>
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
                    <br />
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
            </div>
          ))}
        </Slider>
      ) : (
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
      )}
    </Grid>
  )
}

export default ContainerItems
