'use client'

import Image from 'next/image'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import items from '@/menuStore.json'

export default function AboutPizza ({ product }) {
    return (
        <Grid
            container
            item
            xs={12}
            md={4.7}
            spacing={1}
            sx={{
                height: {
                    xs: 'fit-content',
                    md: '400px'
                },
                overflowY: 'auto',
                pb: 4
            }}
        >
            <Grid
                item
                sx={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: 3/2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
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
            </Grid>
            <Grid item xs={12} md={11}>
                <Typography
                    id="modal-modal-title"
                    component="p"
                    sx={{
                        fontSize: '1rem',
                    }}
                >
                    {product.text}
                </Typography>
            </Grid>

        </Grid>
    )
}