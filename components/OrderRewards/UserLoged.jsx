'use client'

import useGetModal from '@/hooks/useGetModal'
import InputPhoneNumber from '@/components/InputPhoneNumber/InputPhoneNumber'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
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
                                name='name'
                                position='end'
                                onClick={handleEditing}
                                disabled={errors.name ? true : false}    
                            >
                                {
                                    editing.name
                                    ? <CheckIcon />
                                    : <BorderColorIcon />
                                }
                            </IconButton>
                        ): null
                    ),
                    readOnly: !editing.name && open ? true : false
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

            <InputPhoneNumber
                numberPhone={inputs.numberPhone}
                errorsNumberPhone={errors.numberPhone}
                userLoged={userLoged}
                type={type}
                handleChangeNumberPhone={handleChangeNumberPhone}
                InputProps={{
                    endAdornment: ( open
                        ? (
                            <IconButton
                                name='numberPhone'
                                position='end'
                                onClick={handleEditing}
                                disabled={errors.numberPhone ? true : false}    
                            >
                                {
                                    editing.numberPhone
                                    ? <CheckIcon />
                                    : <BorderColorIcon />
                                }
                            </IconButton>
                        ): null
                    ),
                    readOnly: !editing.numberPhone && open ? true : false
                }}
            />
        </Grid>
    )
}

export default UserLoged