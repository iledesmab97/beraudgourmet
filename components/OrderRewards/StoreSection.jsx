'use client'

import useGetModal from '@/hooks/useGetModal'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function StoreSection () {

    const {handleOpenModalPlace} = useGetModal({modalType: 'place'})

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}>

            <Typography
              variant='title'
              gutterBottom>
              Tienda
            </Typography>

            <Button
              variant='contained'
              color='secondary'
              sx={{ my:1 }}
              fullWidth
              onClick={handleOpenModalPlace}
            >
                Ver la lista de tiendas
            </Button>

          </Box>
    )
}