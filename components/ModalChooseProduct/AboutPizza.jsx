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
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: 3/2
            }}
            >
                <Image src={product.image} alt={product.name} fill/>
            </Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {product.text}
            </Typography>

        </Grid>
    )
}