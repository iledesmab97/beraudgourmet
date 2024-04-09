import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check'

import { useState } from 'react'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'

function InputUpdate({value, updateProperty, properties, updateState, handleChangeInput, pizzaNew, ...props}) {
    
    const [myValue, setMyValue] = useState(value)
    const [edit, setEdit] = useState(false)
    const { handleUpdateAlertMessage } = useGetAlertMessage()

    function handleChange(event) {
        setMyValue(event.target.value)
        handleChangeInput({value: event.target.value, property: properties.property})
    }   

    async function handleEdit() {
        if (edit && myValue !== value) {
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
                    type: 'pizzas',
                    id,
                    property,
                    value: myValue
                })
            }
        }
        setEdit(prevState => !prevState)
    }

    return (
        <TextField
            value={myValue}
            onChange={handleChange}
            disabled={!(pizzaNew || edit )}
            InputProps={ !pizzaNew && {
                endAdornment: (
                    <IconButton
                        onClick={handleEdit}
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