'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PersonIcon from '@mui/icons-material/Person'
import { MuiTelInput } from 'mui-tel-input'

const styleButtons = {
    textTransform: 'none',
    marginTop: '8px',
    marginBottom: '4px'
}

function UserNew({ inputs, handleChange, errors, currentUser, handleChangePhoneNumber, verifyUser }) {
    return (

    <>
        <Typography
            variant='title'
            gutterBottom>
            Iniciar Sesión / Registrarse
        </Typography>
    
        <TextField
            name='email'
            label='Email'
            type='email'
            fullWidth
            size='small'
            margin='dense'
            helperText={errors.email ? errors.email : ''}
            error={false}
            value={inputs.email}
            onChange={handleChange}
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <MailOutlineIcon />
                </InputAdornment>
            ),
            }}
        />
    
        {
            !currentUser && (
            <>
                <TextField
                name='name'
                label="Nombre"
                type='text'
                size='small'
                margin='dense'
                fullWidth
                helperText=''
                value={inputs.name}
                error={false}
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <PersonIcon />
                    </InputAdornment>
                    ),
                }}
                />
                
                <MuiTelInput
                value={inputs.phoneNumber}
                onChange={handleChangePhoneNumber}
                margin='dense'
                size='small'
                />
    
                {/* <CountryTelephoneCode /> */}
            </>
            )
        }
    
        {
            inputs.email && !errors.email && (
                <Box
                    sx={{ position: 'relative'}}
                >
                    <TextField
                    name='password'
                    label="Contraseña"
                    type='password'
                    // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
                    size='small'
                    margin='dense'
                    fullWidth
                    helperText={errors.password ? errors.password : ''}
                    value={inputs.password}
                    error={errors.password ? true : false}
                    onChange={handleChange}
                    />
                    
                </Box>
            )
        }
    
        {
            currentUser && (
                <Box
                    sx={{
                    mt: 2,
                    // width: '100%'
                    }}
                >
                    <Button
                    fullWidth
                    variant='contained'
                    margin='dense'
                    // size='small'
                    sx={styleButtons}
                    onClick={verifyUser}
                    >
                    Iniciar seción
                    </Button>
                    <Button
                    fullWidth
                    sx={styleButtons}
                    variant='outlined'
                    color='secondary'
                    >
                    ¿Olvidó la contraseña?  
                    </Button>
                    <Button
                    fullWidth
                    variant='outlined'
                    sx={styleButtons}
                    color='secondary'
                    >
                    Crear cuenta nueva
                    </Button>
                </Box>
            )
        }
    </>
    )
}

export default UserNew