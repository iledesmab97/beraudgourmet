import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import InputUpdate from '../InputUpdate/InputUpdate'

import { useState, useEffect, useRef } from 'react'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'

import { updateExtraIngredient, makeExtraIngredient, removeExtraIngredient } from '@/services/productApi'

function validation(extra) {
    const errors = {}
    if (!extra.name) errors.name = 'Indica un valor'
    if (!extra.cost) errors.cost = 'Indica un valor'
    return errors
}

function ExtraIngredientsManager({ allExtraIngredients, handleExtraIngredients }) {

    const [currentExtraIngredient, setCurrentExtraIngredient]  = useState({})
    const [inputName, setInputName] = useState('')
    const [inputCost, setInputCost] = useState(null)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const { handleUpdateAlertMessage } = useGetAlertMessage()
    const newExtraSElected = useRef(null)

    useEffect(() => {
        if (newExtraSElected.current) {
            handleChangeSelect(newExtraSElected.current)
        }
    }, [allExtraIngredients])

    function handleChangeSelect(value) {
        if (value === 'Nuevo extra') {
            setCurrentExtraIngredient({name: value, cost: ''})
            return setInputCost('')
        }
        const [newCurrentExtraIngredient] = allExtraIngredients.filter(extra => extra.name === value)
        setCurrentExtraIngredient(newCurrentExtraIngredient)
        setInputCost(newCurrentExtraIngredient.cost)
    }

    function handleChangeInputName(value) {
        setInputName(value)
    }

    function handleChangeInputCost(value) {
        setInputCost(value)
    }

    async function updatedeExtraIngredient() {
        console.log('validando datos...')
        setLoading(true)
        const newErrors = validation({name: currentExtraIngredient.name, cost: inputCost})
        if (newErrors.cost) {
            setLoading(false)
            return setErrors(newErrors)
        }
        console.log('datos validados con exito')
        console.log('guardando información...')
        const response = await updateExtraIngredient(currentExtraIngredient.id, {property: 'cost', value: inputCost})
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
            handleExtraIngredients({
                id: currentExtraIngredient.id,
                property: 'cost',
                value: inputCost
            }, 'update')
            setCurrentExtraIngredient(prevState => ({
                ...prevState,
                cost: inputCost
            }))
        }
        console.log('Información guardada con exito')
        setLoading(false)
    }

    async function deleteExtraIngredient() {
        console.log('eliminando ingrediente extra...')
        setLoading(true)
        const response = await removeExtraIngredient(currentExtraIngredient.id)
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
            let newExtra
            for (let extra of allExtraIngredients) {
                if (extra.id !== currentExtraIngredient.id) {
                    newExtra = extra
                    break
                }
            }
            newExtraSElected.current = null
            await handleChangeSelect(newExtra.name)
            handleExtraIngredients(currentExtraIngredient, 'remove')
        }
        console.log('Ingediente eliminado exitosamente')
        setLoading(false)
    }

    async function addExtraIngredient() {
        console.log('añadiendo nuevo ingrediente extra...')
        console.log('validando datos...')
        setLoading(true)
        const newErrors = validation({name: inputName, cost: inputCost})
        if (Object.keys(newErrors).length) {
            setLoading(false)
            return setErrors(newErrors)
        }
        console.log('datos validados con exito')
        console.log('guardando información...')
        const response = await makeExtraIngredient({name: inputName, cost: inputCost})
        let text, status
        if (response.message) {
            text = response.message
            status = 'error'
        } else {
            text = 'Extra ingredient created successfully'
            status = 'success'
        }
        handleUpdateAlertMessage({
            checked: true,
            text,
            status
        })
        if (!response.message) {
            newExtraSElected.current = response.name
            handleExtraIngredients(response, 'add')
        }
        console.log('Información guardada con exito')
        setLoading(false)
    }

    return (
        <Grid
            item
            xs={12}
            container
            direction={'column'}
            alignItems={'center'}
            spacing={2}
        >
            <Grid item>
                <Typography variant='title'>Ingredientes Extra</Typography>
            </Grid>
            <Grid
                item
                container
                justifyContent={'space-around'}
                spacing={1}
            >
                <Grid
                    item
                    xs={8}
                    md={7}
                >
                    <FormControl fullWidth>
                        <InputLabel>Ingredientes Extra</InputLabel>
                        <Select
                            value={ currentExtraIngredient.name ? currentExtraIngredient.name : ''}
                            label='Ingredientes Extra'
                            onChange={(event) => {handleChangeSelect(event.target.value)}}
                        >
                            {
                                allExtraIngredients.map(extra => (
                                    <MenuItem value={extra.name} key={extra.id} >{extra.name}</MenuItem>
                                ))
                            }
                            <MenuItem value={'Nuevo extra'} key={'Nuevo extra'} >Nuevo extra</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {
                    currentExtraIngredient.cost ? (
                        <Grid item xs={4} sm={3} md={3}>
                            <TextField
                                value={inputCost}
                                onChange={(event) => {handleChangeInputCost(event.target.value)}}
                                error={Boolean(errors.cost)}
                                helperText={errors.cost}
                            />
                        </Grid>
                    ) : currentExtraIngredient.cost === '' ? (
                        <Grid
                            container
                            item
                            justifyContent={'space-around'}
                        >
                            <TextField
                                value={inputName}
                                onChange={(event) => {handleChangeInputName(event.target.value)}}
                                error={Boolean(errors.name)}
                                helperText={errors.name}
                                placeholder='Nombre ...'
                                sx={{
                                    width: {
                                        xs: '60%',
                                        sm: '60%',
                                        md: '70%',
                                    }
                                }}
                            />
                            <TextField
                                value={inputCost}
                                onChange={(event) => {handleChangeInputCost(event.target.value)}}
                                error={Boolean(errors.cost)}
                                helperText={errors.cost}
                                placeholder='Costo'
                                sx={{
                                    width: {
                                        xs: '30%',
                                        sm: '35%',
                                        md: '20%'
                                    }
                                }}
                            />
                        </Grid>
                    ) : null
                }
            </Grid>
            {
                currentExtraIngredient.cost ? (
                    <Grid
                        item
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '32px'
                        }}
                    >
                        <Button
                            variant='contained'
                            onClick={updatedeExtraIngredient}
                            disabled={loading || currentExtraIngredient.cost === inputCost}
                        >
                            Actualizar</Button>
                        <Button
                            variant='contained'
                            onClick={deleteExtraIngredient}
                            disabled={loading}
                        >
                            Eliminar
                        </Button>
                    </Grid>
                ) : currentExtraIngredient.cost === '' ? (
                    <Grid item>
                        <Button
                            variant='contained'
                            onClick={addExtraIngredient}
                            disabled={loading}
                        >
                            Agregar
                        </Button>
                    </Grid>
                ) : null
            }
        </Grid>
    )
}

export default ExtraIngredientsManager