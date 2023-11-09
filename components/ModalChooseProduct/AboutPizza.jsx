'use client'

import Image from 'next/image'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import items from '@/menuStore.json'

export default function AboutPizza () {
    return (
        <Grid item xs={5} sx={{ height: '85%'}}>
            <Box
            sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: 3/2
            }}
            >
            <Image src={items[0].image} alt='Pizza Margarita' fill/>
            </Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Acá viene todo el texto relacionado con la pizza, como su procedencia, los ingredientes, la receta, etc.
            </Typography>

        </Grid>
    )
}