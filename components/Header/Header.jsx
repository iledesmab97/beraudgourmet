'use client'

import Image from 'next/image'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'

import logoBeraund from '../../public/images/homeimg/homeimgberaud/logoBeraud.png'
import links from '../NavBar/navbarpaths.json'


function Header() {
  return (
    <AppBar>
      <Container maxWidth="lg">
        <Toolbar sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Box>
            <Image src={logoBeraund} alt={'logoBeraund'} width={130}/>
          </Box>
        </Toolbar>
        <Toolbar component='nav' sx={{justifyContent: 'flex-start', gap: 3}} >
          {
            links.map(link => (
              <Link
                href={link.path}
                color='#000'
                key={link.title}
                sx={{textDecoration: 'none'}}
              >{link.title}</Link>
            ))
          }
        </Toolbar>
        <Toolbar component='nav' sx={{justifyContent: 'flex-start', gap: 3}} >
          {
            links[0].subNav.map(link => (
              <Link
                href={link.path}
                color='#000'
                key={link.title}
                sx={{textDecoration: 'none'}}
              >{link.title}</Link>
            ))
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
