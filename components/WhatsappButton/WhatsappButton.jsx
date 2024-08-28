'use client'

import Image from 'next/image'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Link from '@mui/material/Link'

import {WhatsAppIcon} from '../../public/svg/index';

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import useGetOrders from '@/hooks/useGetOrders'
import { IconButton, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { phoneNumber, text1 } from '@/utils/contact'

function WhatsappButton() {

    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const pathname = usePathname()
    const { orders } = useGetOrders()
    const [totalMatches, setTotalMatches] = useState('null')

    useEffect(() => {
        setTotalMatches(String(matches))
    }, [matches])

    return (
        <>
            {
                pathname !== '/admin' ? (
                    totalMatches === 'true' && (orders.length) ? null : (
                        <Fab
                            sx={{
                                position: 'fixed',
                                bottom: '20px',
                                right: '20px',
                                backgroundColor: '#25D366'
                            }}
                        >
                            <Link
                                href={`https://wa.me/${phoneNumber}/?text=${text1}`}
                                // href={`https://wa.me/?text=${text}`}
                                target='_blank'
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
          <IconButton
            
          >
            <WhatsAppIcon />
          </IconButton>
                            </Link>
                        </Fab>
                    )
                ) : null
            }
        </>
    )
}

export default WhatsappButton