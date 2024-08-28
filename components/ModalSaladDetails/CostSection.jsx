import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import InputUpdate from '@/components/InputUpdate/InputUpdate'

import IconButton from '@mui/material/IconButton'

import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check'

import { useState } from 'react'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'

function validator(inputCost) {
    let error = ''
    if (!inputCost) error = 'este campo no puede estar vacio'
    if (/[^0-9.]/.test(inputCost)) error = 'Solo números o punto (.)'
    return error
}

function CostSection({ salad, saladNew, errors, handleChangeInput, handleInputsChecked, updateSaladProperty, updateProperty, updateState }) {

    const [price, setPrice] = useState(salad.price)
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { handleUpdateAlertMessage } = useGetAlertMessage()

    function handleChange(value) {
        setPrice(value)
        setError(validator(value))
    }

    async function handleEdit() {
        if (edit) {
            if (error) return
            if (price != salad.price) {
                const response = await updatePrice()
                if (response !== 'Información guardada con exito') {
                    return console.log(response)
                }
                console.log(response)
            }
        }
        setEdit(prevState => !prevState)
    }

    async function updatePrice() {
        console.log('Actualizando...')
        setLoading(true)
        updateSaladProperty({
            id: salad.id,
            property: 'cost',
            value: price
        })
    }

    return (
        <Grid
            container
            // justifyContent={'center'}
            spacing={3}
            sx={{
                width: '100%',
            }}
        >
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography component={'h2'} variant={'title'} >Precio</Typography>
            </Grid>
            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }} >
                <Typography>Precio:</Typography>
            </Grid>
            <Grid item xs sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                {
                    saladNew ? (
                        <InputUpdate
                            value={salad.price}
                            // updateProperty={updateProperty}
                            // updateState={updateState}
                            properties={{ id: salad.id, property: 'cost' }}
                            // validateError={validationPrice}
                            pizzaNew={saladNew}
                            errors={errors.cost}
                            handleChangeInput={handleChangeInput}
                            handleInputsChecked={handleInputsChecked}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            sx={{
                                width: '160px'
                            }}
                        />
                    ) : (
                        <TextField
                            value={price}
                            onChange={(event) => {handleChange(event.target.value)}}
                            disabled={!edit}
                            error={Boolean(error)}
                            helperText={error}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        onClick={handleEdit}
                                        disabled={loading}
                                        // sx={errorStyles(errors)}
                                    >
                                        {
                                            edit ? (
                                                <CheckIcon />
                                            ) : (
                                                <EditIcon />
                                            )
                                        }
                                    </IconButton>
                                ),
                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                            }}
                            sx={{
                                width: '160px'
                            }}
                        />
                    )
                }
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            {
                !saladNew ? (
                    <>
                        <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }} >
                            <Typography>Precio al público:</Typography>
                        </Grid>
                        <Grid item xs sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} >
                            <TextField
                                value={salad.totalPriceByUnity}
                                disabled
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                                }}
                                sx={{
                                    width: '160px'
                                }}
                            />
                        </Grid>
                    </>
                ) : null
            }
        </Grid>
    )
}

export default CostSection