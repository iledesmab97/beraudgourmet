import Toolbar from '@mui/material/Toolbar'
import Paper from '@mui/material/Paper'

import LocalPizzaIcon from '@mui/icons-material/LocalPizza'

import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import links from './navbarpaths.json'

const navImage = {
  Pizzas: <LocalPizzaIcon />
}

const stylesMediumScreens = {
  position: 'fixed',
  top: '2%',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: '1',
  backgroundColor: '#f5f5f5',
  boxShadow: '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
  // boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
  borderRadius: '50px',
}

function styleGiver(matches) {
  let styles = {}
  if (matches) {
    styles = {
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

  // useEffect(() => {
  //   handleSubNav(getSubNav(pathname))
  // }, [pathname])

  // function handleSubNav(newSubNav) {
  //   setSubNav(newSubNav)
  // }

  if (pathname === 'admin') return null

  return (
    <>
      <Toolbar
        component='nav'
        sx={styleGiver(matches)}
      >
        {
          links.map(link => (
            <Link
              href={link.path}
              key={link.title}
              style={{
                textDecoration: 'none',
                color: '#4e5762'
              }}
            >
              {navImage[link.title]}
              {/* <Typography variant='title'>{link.title}</Typography> */}
            </Link>
          ))
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
