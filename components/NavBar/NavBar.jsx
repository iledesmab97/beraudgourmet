import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'

import MenuIcon from '@mui/icons-material/Menu'

import LocalPizzaIcon from '@mui/icons-material/LocalPizza'

import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useGetDrawer from '@/hooks/useGetDrawer'

import styles from './NavBar.module.css'
import links from './navbarpaths.json'

const navImage = {
  Pizzas: <LocalPizzaIcon />
}

const stylesBasics = {
  minWidth: '160px',
  display: 'flex',
  justifyContent: 'space-between',
  alingItems: 'center',
  backgroundColor: '#f5f5f5',
}

const stylesMediumScreens = {
  position: 'absolute',
  top: '84px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: '1',
  boxShadow: '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
  borderRadius: '50px',
}

function styleGiver(matches) {
  let styles = stylesBasics
  if (matches) {
    styles = {
      ...styles,
      ...stylesMediumScreens
    }
  }
  return styles
}

function NavBar() {

  const pathname = usePathname()
  // const [subNav, setSubNav] = useState(getSubNav(pathname))
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const { handleChangeOpenDrawer } = useGetDrawer()

  // useEffect(() => {
  //   handleSubNav(getSubNav(pathname))
  // }, [pathname])

  useEffect(() => {
    if (!matches) return

    const navBar = document.querySelector('#navBar-contianer')
    const body = document.getElementsByTagName('html')[0]

    function handlePosition() {
      const topDistance = navBar.getBoundingClientRect().top
      const { position } = navBar.style

      if (body.scrollTop >= 63 && position !== 'fixed') {
        navBar.style.position = 'fixed'
        navBar.style.top = 21 + 'px'
      } else if (body.scrollTop < 63 && position !== 'absolute') {
        navBar.style.top = 84 + 'px'
        navBar.style.position = 'absolute'
      }
    }

    window.addEventListener('scroll', handlePosition)

    return () => {
      window.removeEventListener('scroll', handlePosition)
      navBar.style.position = ''
      navBar.style.top = ''
    }
  }, [matches])

  // function handleSubNav(newSubNav) {
  //   setSubNav(newSubNav)
  // }

  if (pathname === 'admin') return null

  return (
    <>
      <Toolbar
        id='navBar-contianer'
        component='nav'
        sx={styleGiver(matches)}
      >
        <Box
          sx={{
            display: 'flex',
            alingItems: 'center'
          }}
        >
          <Link
            className={styles.linkToPath}
            href={'#title-pizzas-container'}
          >
            <IconButton>
              <LocalPizzaIcon />
            </IconButton>
          </Link>
        </Box>
        {
          matches && (
            <IconButton
              onClick={() => {handleChangeOpenDrawer(true)}}
            >
              <MenuIcon />
            </IconButton>
          )
        }
      </Toolbar>
      {/* <Toolbar component='nav' sx={{justifyContent: 'flex-start', gap: 3}} >
        {
          subNav.map(link => (
            <Link
              key={link.title}
              color='#000'
              sx={{textDecoration: 'none', cursor: 'pointer'}}
              onClick={() => { scrollToSection(link.path, -192) }}
            >
              <Typography variant='title'>{link.title}</Typography>
            </Link>
          ))
        }
      </Toolbar> */}
    </>
  )
}

export default NavBar
