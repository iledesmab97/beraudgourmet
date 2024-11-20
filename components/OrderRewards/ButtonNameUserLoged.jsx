'use client'

import useGetModal from '@/hooks/useGetModal'

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import AccountCircle from '@mui/icons-material/AccountCircle'

function ButtonNameUserLoged({ inputs }) {

    const { handleOpenModal } = useGetModal({modalType: 'user'})

    return (
        <TextField
            name='name'
            variant='outlined'
            color='secondary'
            type={ 'button' }
            value={ inputs.name}
            onClick={() => {handleOpenModal('user')}}
            InputProps={{
                startAdornment: (
                    <InputAdornment position='start'>
                        <AccountCircle />
                    </InputAdornment>
                )
            }}
            inputProps={{
                sx: {
                    height:'23px',
                    padding: '8.5px 14px 8.5px 0px',
                    textAlign: 'left',
                    cursor: 'pointer'
                }
            }}
            sx={{
                width: '100%',
                m: '0px'
            }}
        />
    )
}

export default ButtonNameUserLoged