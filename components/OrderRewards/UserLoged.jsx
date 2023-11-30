'use client'

import { useEffect } from 'react'
import useGetModal from '@/hooks/useGetModal'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { MuiTelInput } from 'mui-tel-input'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import CheckIcon from '@mui/icons-material/Check'

function UserLoged({ userLoged, handleChange, handleChangeNumberPhone, inputs, errors, type, editing, handleEditing, open }) {

    const { handleOpenModal } = useGetModal({modalType: 'user'})

    return (
        <Grid
            item
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}
        >
            <TextField
                name='name'
                variant='outlined'
                color='secondary'
                type={ userLoged && !type ? 'button' : 'text'}
                error={ errors.name ? true : false }
                helperText={ errors.name ? errors.name : ''}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <AccountCircle />
                        </InputAdornment>
                    ),
                    endAdornment: ( open
                        ? (
                            <IconButton
                                position='end'
                                onClick={handleEditing}
                                disabled={errors.name ? true : false}    
                            >
                                {
                                    editing
                                    ? <CheckIcon />
                                    : <BorderColorIcon />
                                }
                            </IconButton>
                        ): null
                    ),
                    readOnly: editing ? false : true
                }}
                sx={{
                    width: '100%',
                    // height: '40px',
                    m: '0px'
                }}
                onChange={handleChange}
                value={ inputs.name}
                inputProps={{
                    sx: {
                        height:'23px',
                        padding: '8.5px 14px 8.5px 0px',
                        textAlign: 'left',
                        cursor: userLoged && !type ? 'pointer' : ''
                    }
                }}
                onClick={() => {
                    if(!userLoged) return
                    if (!open) handleOpenModal('user')
                }}
            />

            <MuiTelInput
                type={ userLoged && !type ? 'button' : 'text'}
                value={ inputs.numberPhone}
                onChange={handleChangeNumberPhone}
                size='small'
                error={ errors.numberPhone ? true : false }
                helperText={ errors.numberPhone ? errors.numberPhone : ''}
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
        </Grid>
    )
}

export default UserLoged