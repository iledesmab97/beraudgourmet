'use client'

import Image from 'next/image'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import items from '@/menuStore.json'

export default function AboutPizza ({ product }) {
    return (
        <Grid 
            item
            xs={12}
            md={4.5}
            pr={4}
            sx={{
                height: '85%',
                overflowY: 'auto'
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: 3/2
            }}
            >
                <Image
                    src={product.image}
                    alt={product.name}
                    width={280}
                    height={280}
                    style={{
                        objectFit: 'contain'
                    }}
                />
            </Box>
            <Typography
                id="modal-modal-title"
                component="p"
                sx={{
                    fontSize: '1rem'
                }}
            >
                {product.text}
            </Typography>

        </Grid>
    )
}