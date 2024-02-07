'use client'

import Image from 'next/image'

import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Link from '@mui/material/Link'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import whatsappImage from '@/public/images/homeimg/logos/whatsapp.svg'

const phoneNumber = '584120146661'
const text = 'Hola mundo!'

function WhatsappButton() {
    return (
        <Fab
            // color='primary'
            sx={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                backgroundColor: '#25D366'
            }}
        >
            <Link
                href={`https://wa.me/${phoneNumber}/?text=${text}`}
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
                <Image
                    src={whatsappImage}
                    alt='whatsappLogo'
                    style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        aspectRatio: 1
                    }}   
                />
                {/* <WhatsAppIcon/> */}
            </Link>
        </Fab>
    )
}

export default WhatsappButton