'use client'

import useGetModal from '@/hooks/useGetModal'

import TextField from '@mui/material/TextField'
import { MuiTelInput } from 'mui-tel-input'
import InputAdornment from '@mui/material/InputAdornment'
import AccountCircle from '@mui/icons-material/AccountCircle'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'

function UserLoged({ userLoged, handleChange, handleChangeNumberPhone, inputs, type }) {

    const { handleOpenModal } = useGetModal({modalType: 'user'})

    return (
        <>
            <TextField
                name='name'
                variant='outlined'
                color='secondary'
                type={ userLoged && !type ? 'button' : 'text'}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <AccountCircle />
                        </InputAdornment>
                    )
                }}
                sx={{
                    width: '100%',
                    height: '40px',
                    m: '0px'
                }}
                onChange={handleChange}
                value={ inputs.name}
                inputProps={{
                    sx: {
                        height:'23px',
                        padding: '8.5px 14px 8.5px 0px',
                        textAlign: 'left'
                    }
                }}
                onClick={() => {
                    if(!userLoged) return
                    handleOpenModal('user')
                }}
            />

            <MuiTelInput
                type={ userLoged && !type ? 'button' : 'text'}
                value={ inputs.numberPhone}
                onChange={handleChangeNumberPhone}
                size='small'
                sx={{
                    width: '100%',
                    m: '0px',
                    textAlign: 'left'
                }}
                disabled={ userLoged && !type ? true : false}
                inputProps={{
                    sx: {
                        textAlign: 'left'
                    }
                }}
            />
        </>
    )
}

export default UserLoged