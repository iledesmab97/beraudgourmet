'use client'

import UserLoged from './UserLoged'

import Box from '@mui/material/Box'
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

function UserNew({ inputs, handleChange, errors, editing, currentUser, handleChangeNumberPhone, logInUser, signUp }) {
    return (
        <>    
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
                sx={{
                    m: '0px'
                }}
            />
        
            {
                !currentUser && (
                    <UserLoged
                        userLoged={currentUser}
                        handleChange={handleChange}
                        handleChangeNumberPhone={handleChangeNumberPhone}
                        inputs={inputs}
                        errors={errors}
                        editing={editing}
                    />
                )
            }
        
            {
                !errors.email && !(errors.email === false) && (
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
                            onClick={logInUser}
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

            {
                !errors.email && !(errors.email === false) && !currentUser && (
                    <Button
                        variant='contained'
                        disabled={false}
                        onClick={signUp}
                    >
                        Registrarse
                    </Button>
                )
            }
        </>
    )
}

export default UserNew