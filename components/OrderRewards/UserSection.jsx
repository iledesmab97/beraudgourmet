'use client'

import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

export default function UserSection () {
    return (
        <FormControl sx={{ display: 'flex', flexDirection: 'column' }}>

            <Typography
              variant='title'
              gutterBottom>
              Iniciar Sesión / Registrarse
            </Typography>

            <TextField
              id="email"
              label='Email'
              type='email'
              fullWidth
              size='small'
              margin='dense'
              helperText=''
              error={false}
              onChange={() => {}}
              // variant='standard'
            />

            <TextField
              id="name"
              label="Nombre"
              type='text'
              size='small'
              margin='dense'
              fullWidth
              helperText=''
              error={false}/>

            <TextField
              id="number"
              label="Número de teléfono"
              type='text'
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
              size='small'
              margin='dense'
              fullWidth
              helperText=''
              error={false}/>

          </FormControl>
    )
}