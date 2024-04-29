import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check'

import { useState } from 'react'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'

function validation(input) {
    let error = ''
    if (!input) error = 'Este campo no puede estar vacío'
    return error
}

function errorStyles(error) {
    if (!error) return {}
    return {
        bgcolor: '#d32f2f',
        color:'#FFFDFF'
    }
}

function InputUpdate({value, updateProperty, properties, updateState, handleChangeInput, pizzaNew, errors, ...props}) {
    
    const [myValue, setMyValue] = useState(value)
    const [edit, setEdit] = useState(pizzaNew || false)
    const { handleUpdateAlertMessage } = useGetAlertMessage()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function handleChange(event) {
        setError('')
        setMyValue(event.target.value)
    }

    async function handleEdit() {
        if (!edit) return setEdit(true)
        console.log('Validando datos...')
        const newError = validation(myValue)
        if (newError) {
            console.log('Error en la validación de datos')
            return setError(newError)
        }
        console.log('Datos validados')
        
        if (pizzaNew) {
            handleChangeInput({value: myValue, property: properties.property})
            return setEdit(prevState => !prevState)
        }

        if (edit && myValue !== value) {
            console.log('Guardando información...')
            setLoading(true)
            const { property, id } = properties
            const response = await updateProperty( id, {property, value: myValue})
            let text, status
            if (response.message) {
                text = response.message
                status = 'error'
            } else {
                text = response
                status = 'success'
            }
            handleUpdateAlertMessage({
                checked: true,
                text,
                status
            })
            if (!response.message) {
                updateState({
                    id,
                    property,
                    value: myValue
                })
            }
            console.log('Información guardada con exito')
            setLoading(false)
        }
        setEdit(prevState => !prevState)
    }

    return (
        <TextField
            value={myValue}
            onChange={handleChange}
            disabled={!(pizzaNew || edit )}
            error={Boolean(error)}
            helperText={error}
            InputProps={{
                endAdornment: (
                    <IconButton
                        onClick={handleEdit}
                        disabled={loading}
                        sx={errorStyles(errors)}
                    >
                        {
                            edit ? (
                                <CheckIcon />
                            ) : (
                                <EditIcon />
                            )
                        }
                    </IconButton>
                )
            }}
            {...props}
        />
    )
}

export default InputUpdate