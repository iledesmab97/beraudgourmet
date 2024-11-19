'use client'

import InputPhoneNumber from '@/components/InputPhoneNumber/InputPhoneNumber'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import CheckIcon from '@mui/icons-material/Check'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import useHandlerUserThunk from "@/hooks/useHandlerUserThunk"

import { getInputsErrors } from "@/utils/preparingData"

function UserLogedData() {

    const { user } = useSelector(state => state.user)
    const [inputs, setInputs] = useState(() => {
        const { name, numberPhone } = user
        return {
            name,
            numberPhone
        }
    })
    const [editing, setEditing] = useState({
        name: false,
        numberPhone: false
    })
    const [errors, setErrors] = useState({
        name: "",
        numberPhone: ""
    })
    const { updateUser } = useHandlerUserThunk()

    function handleEditing(property) {
        const newEditing = {
            ...editing,
            [property]: !editing[property]
        }
        if (!newEditing[property]) {
            updateUser({
                property,
                value: inputs[property]
            })
        }
        setEditing(newEditing)
    }

    function handleChangeInputs({ property, value }) {
        const newInputs = {
            ...inputs,
            [property]: value
        }
        handleErrros(newInputs)
        setInputs(newInputs)
    }

    function handleErrros(inputs) {
        const { name, numberPhone } = getInputsErrors(inputs)
        setErrors({ name, numberPhone })
    }

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
                type={ 'text' }
                error={ errors.name ? true : false }
                helperText={ errors.name ? errors.name : ''}
                placeholder='Nombre'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <AccountCircle />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <IconButton
                            name='name'
                            position='end'
                            onClick={() => { handleEditing("name") }}
                            disabled={errors.name ? true : false}    
                        >
                            {
                                editing.name
                                ? <CheckIcon />
                                : <BorderColorIcon />
                            }
                        </IconButton>
                    ),
                    readOnly: !editing.name
                }}
                sx={{
                    width: '100%',
                    // height: '40px',
                    m: '0px'
                }}
                onChange={(event) => {handleChangeInputs({ property: event.target.name, value: event.target.value})}}
                value={ inputs.name}
                inputProps={{
                    sx: {
                        height:'23px',
                        padding: '8.5px 14px 8.5px 0px',
                        textAlign: 'left',
                        // cursor: userLoged && !type ? 'pointer' : ''
                    }
                }}
            />

            <InputPhoneNumber
                numberPhone={inputs.numberPhone}
                errorsNumberPhone={errors.numberPhone}
                userLoged={true}
                type={"text"}
                handleChangeNumberPhone={(value) => {handleChangeInputs({ property: "numberPhone", value })}}
                InputProps={{
                    endAdornment: (
                        <IconButton
                            name='numberPhone'
                            position='end'
                            onClick={() => {handleEditing("numberPhone")}}
                            disabled={Boolean(errors.numberPhone)}    
                        >
                            {
                                editing.numberPhone
                                ? <CheckIcon />
                                : <BorderColorIcon />
                            }
                        </IconButton>
                    ),
                    readOnly: !editing.numberPhone
                }}
            />
        </Grid>
    )
}

export default UserLogedData