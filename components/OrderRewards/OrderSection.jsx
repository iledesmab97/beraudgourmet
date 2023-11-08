'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function OrderSection () {
    return (
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Typography
              variant='title'
              gutterBottom>
              Pedido
            </Typography>
            <br/>
            <Typography variant='p'>
              Su pedído está vacio
            </Typography>

          </Box>
    )
}