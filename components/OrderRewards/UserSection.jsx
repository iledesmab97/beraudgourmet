'use client'

import useHandleUser from '@/hooks/useHandleUser'
import UserLoged from './UserLoged'
import UserNew from './UserNew'

import FormControl from '@mui/material/FormControl'

const styleButtons = {
  textTransform: 'none',
  marginTop: '8px',
  marginBottom: '4px'
}

export default function UserSection () {

  const { inputs, handleChange, errors, currentUser, userLoged, handleChangePhoneNumber, verifyUser } = useHandleUser()

  return (
    <FormControl sx={{ display: 'flex', flexDirection: 'column' }}>

      {
        userLoged ? (
          <UserLoged userLoged={userLoged} />
        ) : (
          <UserNew
            inputs={inputs}
            handleChange={handleChange}
            errors={errors}
            currentUser={currentUser}
            handleChangePhoneNumber={handleChangePhoneNumber}
            verifyUser={verifyUser}
          />
        )
      }


    </FormControl>
  )
}