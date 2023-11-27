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

  const { inputs, handleChange, errors, currentUser, userLoged, handleChangeNumberPhone, verifyUser } = useHandleUser()

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
          <UserLoged userLoged={userLoged} inputs={inputs} />
        ) : (
          <UserNew
            inputs={inputs}
            handleChange={handleChange}
            errors={errors}
            currentUser={currentUser}
            handleChangeNumberPhone={handleChangeNumberPhone}
            verifyUser={verifyUser}
          />
        )
      }

    </FormControl>
  )
}