'use client'

import useHandleUser from '@/hooks/useHandleUser'
import UserLoged from './UserLoged'
import UserNew from './UserNew'

import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'

const styleButtons = {
  textTransform: 'none',
  marginTop: '8px',
  marginBottom: '4px'
}

export default function UserSection () {

  const { inputs, handleChange, errors, currentUser, userLoged, editing, handleChangeNumberPhone, logInUser, signUp } = useHandleUser()

  return (
    <FormControl
      sx={{
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

    </FormControl>
  )
}