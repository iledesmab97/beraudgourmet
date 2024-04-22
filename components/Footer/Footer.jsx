'use client'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import Link from 'next/link'

function Footer () {

  const date = new Date().getFullYear()

  return (
    <Box
      sx={{
        py: '40px',
        bgcolor: '#4e5762'
      }}
    >
      <Container>
        <Grid
          container
          direction={'column'}
          justifyContent={'flex-start'}
          alignItems={'stretch'}
          sx={{
            // bgcolor: '#295386',
            bgcolor: '#4e5762'
          }}
        >
          <Grid
            container
            item
            direction={'row'}
            justifyContent={'flex-start'}
          >
            <Grid
              item
              xs={6}
              sm={3}
              md={2}
            >
              <Typography variant='footer_title'>
                For Business
              </Typography>
              <List>
                <ListItem disableGutters>
                  <Link
                    href='/about'
                    style={{
                      textDecoration: 'none'
                    }}
                  >
                    <Typography variant='footer_text_link'>Employer</Typography>
                  </Link>
                </ListItem>
                <ListItem disableGutters>
                  <Link
                    href='/about'
                    style={{
                      textDecoration: 'none'
                    }}
                  >
                    <Typography variant='footer_text_link'>Health Plan</Typography>
                  </Link>
                </ListItem>
                <ListItem disableGutters>
                  <Link
                    href='/about'
                    style={{
                      textDecoration: 'none'
                    }}
                  >
                    <Typography variant='footer_text_link'>Individual</Typography>
                  </Link>
                </ListItem>
              </List>
            </Grid>
            <Grid
              item
              xs={6}
              sm={3}
              md={2}
            >
              <Typography variant='footer_title'>
                Resources
              </Typography>
              <List>
                <ListItem disableGutters>
                  <Link
                    href='/about'
                    style={{
                      textDecoration: 'none'
                    }}
                  >
                    <Typography variant='footer_text_link'>Resource center</Typography>
                  </Link>
                </ListItem>
                <ListItem disableGutters>
                  <Link
                    href='/about'
                    style={{
                      textDecoration: 'none'
                    }}
                  >
                    <Typography variant='footer_text_link'>Testimonials</Typography>
                  </Link>
                </ListItem>
                <ListItem disableGutters>
                  <Link
                    href='/about'
                    style={{
                      textDecoration: 'none'
                    }}
                  >
                    <Typography variant='footer_text_link'>STV</Typography>
                  </Link>
                </ListItem>
              </List>
            </Grid>
            <Grid
              item
              xs={6}
              sm={3}
              md={2}
            >
              <Typography variant='footer_title'>
                Partners
              </Typography>
              <List>
                <ListItem disableGutters>
                  <Link
                    href='/about'
                    style={{
                      textDecoration: 'none'
                    }}
                  >
                      <Typography variant='footer_text_link'>Swin Tech</Typography>
                    </Link>
                </ListItem>
              </List>
            </Grid>
            <Grid
              item
              xs={6}
              sm={3}
              md={2}
            >
              <Typography variant='footer_title'>
                Company
              </Typography>
              <List>
                <ListItem disableGutters>
                  <Link
                    href='/about'
                    style={{
                      textDecoration: 'none'
                    }}
                  >
                      <Typography variant='footer_text_link'>About</Typography>
                  </Link>
                </ListItem>
                <ListItem disableGutters>
                  <Link
                    href='/about'
                    style={{
                      textDecoration: 'none'
                    }}
                  >
                      <Typography variant='footer_text_link'>Press</Typography>
                  </Link>
                </ListItem>
                <ListItem disableGutters>
                  <Link
                    href='/about'
                    style={{
                      textDecoration: 'none'
                    }}
                  >
                      <Typography variant='footer_text_link'>Carrer</Typography>
                  </Link>
                </ListItem>
                <ListItem disableGutters>
                  <Link
                    href='/about'
                    style={{
                      textDecoration: 'none'
                    }}
                  >
                      <Typography variant='footer_text_link'>Contact</Typography>
                  </Link>
                </ListItem>
              </List>
            </Grid>
            <Grid
              item
              xs={6}
              sm={3}
              md={4}
              container
              direction={'column'}
              alignItems={{
                xs: 'flex-start',
                md: 'center'
              }}
            >
              <Grid item>
                <Typography variant='footer_title'>
                  Comming soon on
                </Typography>
              </Grid>
              <Grid
                item
              >
                <List
                  sx={{
                    display: 'flex'
                  }}
                >
                  <ListItem>
                    <IconButton
                      // sx={{ color: 'white'}}
                    >
                      <FacebookIcon />
                    </IconButton>
                  </ListItem>
                  <ListItem>
                    <IconButton>
                      <InstagramIcon />
                    </IconButton>
                  </ListItem>
                  <ListItem>
                    <IconButton>
                      <TwitterIcon />
                    </IconButton>
                  </ListItem>
                  <ListItem>
                    <IconButton>
                      <LinkedInIcon />
                    </IconButton>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>

          <Divider orientation='horizontal' sx={{ width: '100%', border: '#FFFFFF 1px solid', mb: '16px'}} />

          <Grid
            item
            container
            direction={{
              xs: 'column',
              md: 'row'
            }}
            justifyContent={'space-between'}
            spacing={2}
          >
            <Grid item>
              <Typography variant='footer_text'>
                @{date} CodeInn. All right reserved.
              </Typography>
            </Grid>
            <Grid
              item
              container
              direction={{
                xs: 'column',
                md: 'row'
              }}
              spacing={1}
              sx={{
                width: 'fit-content'
              }}
            >
              <Grid item>
                <Typography variant='footer_text_link'>Terms & Conditions</Typography>
              </Grid>
              <Grid item>
                <Typography variant='footer_text_link'>Privaci</Typography>
              </Grid>
              <Grid item>
                <Typography variant='footer_text_link'>Security</Typography>
              </Grid>
              <Grid item>
                <Typography variant='footer_text_link'>Cookie Declaration</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer
