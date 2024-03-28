'use client'

import UserLoged from './UserLoged'

import Link from 'next/link'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import GoogleIcon from '@mui/icons-material/Google';

import useGetModal from '@/hooks/useGetModal'

import { fetchAuthGoogle } from '@/services/authApi'
import { Typography } from '@mui/material'

const styleButtons = {
    textTransform: 'none',
    marginTop: '8px',
    marginBottom: '4px'
}

const stylesLegal = {
    color: 'rgb(28, 58, 93)',
    textDecoration: 'underline',
    cursor: 'pointer'
}

async function signInGoogle() {
    fetchAuthGoogle()
}

function UserNew({ inputs, handleChange, errors, editing, currentUser, handleChangeNumberPhone, logInUser, signUp }) {

    const {handleOpenModal} = useGetModal({modalType: 'legal'})

    return (
        <>
            <Button
                variant='outlined'
                onClick={signInGoogle}
            >
                <GoogleIcon />
            </Button>    
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
                    <>
                        <Typography
                            align='center'
                            sx={{
                                fontSize: '0.9rem'
                            }}
                        >
                            Al ser parte de Beraud acepto los <span style={stylesLegal} onClick={() => {handleOpenModal('legal')}}>términos y condiciones de uso</span>
                        </Typography>
                        <Button
                            variant='contained'
                            disabled={false}
                            onClick={signUp}
                        >
                            Registrarse
                        </Button>
                    </>
                )
            }
        </>
    )
}

export default UserNew