'use client'

import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import LocalPizzaIcon from '@mui/icons-material/LocalPizza';

import Link from 'next/link'
import Image from 'next/image'

import CurrentSession from '@/components/CurrentSession/CurrentSession'
import NavBar from '@/components/NavBar/NavBar'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'


import logoBeraund from '../../public/images/homeimg/homeimgberaud/logoBeraud.png'
import links from '../NavBar/navbarpaths.json'

import { scrollToSection } from '@/utils/moveIntoPage'

const navImage = {
  Pizzas: <LocalPizzaIcon />
}

function getSubNav(currentPath) {
  const route = links.filter((route) => {
    return route.path === currentPath
  })[0]
  if (route) return route.subNav
  return []
}

function Header() {

  const pathname = usePathname()
  const [subNav, setSubNav] = useState(getSubNav(pathname))

  useEffect(() => {
    handleSubNav(getSubNav(pathname))
  }, [pathname])

  function handleSubNav(newSubNav) {
    setSubNav(newSubNav)
  }

  return (
    <AppBar color='default' sx={{ position: 'relative'}}>
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Box>
            <Image src={logoBeraund} alt={'logoBeraund'} width={130}/>
          </Box>
          <CurrentSession />
        </Toolbar>
        <NavBar />
      </Container>
    </AppBar>
  );
}

export default Header;
