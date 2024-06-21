'use client'

import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import UserLoged from './UserLoged'
import UserNew from './UserNew'
import SliceProgressBar from '@/components/SliceProgressBar/SliceProgressBar'

import useHandleUser from '@/hooks/useHandleUser'

const styleButtons = {
  textTransform: 'none',
  marginTop: '8px',
  marginBottom: '4px'
}

export default function UserSection () {

  const { inputs, handleChange, errors, currentUser, userLoged, editing, handleChangeNumberPhone, logInUser, signUp } = useHandleUser()

  return (
    <FormControl
      id='UserSection-container'
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}
    >
        <Typography
            variant='title'
            gutterBottom
          >
            {userLoged ? 'Cuenta' : 'Iniciar Sesión / Registrarse' }
        </Typography>

      {
        userLoged ? (
          <UserLoged userLoged={userLoged} inputs={inputs} errors={errors} editing={editing} />
        ) : (
          <UserNew
            inputs={inputs}
            handleChange={handleChange}
            errors={errors}
            editing={editing}
            currentUser={currentUser}
            handleChangeNumberPhone={handleChangeNumberPhone}
            logInUser={logInUser}
            signUp={signUp}
          />
        )
      }

      <SliceProgressBar section={'user'} />

    </FormControl>
  )
}