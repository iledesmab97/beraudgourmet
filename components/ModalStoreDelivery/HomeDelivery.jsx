'use client'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search';

export default function HomeDelivery() {
    return (
        <>
            <Box sx={{ width: '100%'}}>    
                <Typography
                    variant='title'
                    sx={{
                    alignSelf: 'flex-start'
                    }}
                >
                    DIRECCIÓN DE ENTREGA
                </Typography>

                <TextField
                    id="location"
                    label="Empiece a escribir su dirección de entrega"
                    type='text'
                    size='small'
                    margin='dense'
                    fullWidth
                    error={false}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />
            </Box>
        </>
    )
}