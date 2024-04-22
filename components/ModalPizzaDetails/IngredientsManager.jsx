import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

import { useState } from 'react'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'

import { addIngredient, removeIngredient } from '@/services/ingredientApi'

function IngredientsManager({ allIngredients, handleIngredients }) {

    const [ingredientSelected, setIngredientSelected] = useState('')
    const [ingredientName, setIngredientName] = useState('')
    const { handleUpdateAlertMessage } = useGetAlertMessage()

    function handleChange(value) {
        setIngredientSelected(value)
    }

    async function addNewIngredient() {
        console.log('agregando nuevo ingrediente')
        const newIngredient = await addIngredient(ingredientName)
        let text, status
        if (newIngredient.message) {
            text = newIngredient.message
            status = 'error'
        } else {
            text = 'Successfully created ingredient'
            status = 'success'
        }
        handleUpdateAlertMessage({
            checked: true,
            text,
            status
        })
        if (!newIngredient.message) {
            const newListIngredients = [...allIngredients]
            newListIngredients.push(ingredientName)
            handleIngredients(newListIngredients)
            handleChange(ingredientName)
        }
    }

    async function deleteIngredient() {
        console.log('eliminando ingrediente')
        const response = await removeIngredient({name: ingredientSelected})
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
    }

    function changeIngredientName(event) {
        setIngredientName(event.target.value)
    }

    return (
        <Grid
            item
            sx={{
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
            }}
        >
            <Typography variant='title'>Buscar</Typography>
            <FormControl fullWidth>
                <InputLabel>Ingredientes</InputLabel>
                <Select
                    label='Ingredientes'
                    value={ingredientSelected}
                    onChange={(event) => { handleChange(event.target.value) }}
                >
                    {
                        allIngredients.map(ingredient => (
                            <MenuItem value={ingredient} key={ingredient}>{ingredient}</MenuItem>
                        ))
                    }
                    <MenuItem value='Nuevo Ingrediente'>Nuevo Ingrediente</MenuItem>
                </Select>
            </FormControl>
            {
                ingredientSelected === 'Nuevo Ingrediente' ? (
                    <TextField
                        value={ingredientName}
                        onChange={changeIngredientName}
                    />
                ) : null
            }
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}
            >
                {
                    ingredientSelected === 'Nuevo Ingrediente' ? (
                        <Button
                            variant='contained'
                            onClick={addNewIngredient}
                        >
                            Agregar
                        </Button>
                    ) : (
                        <Button
                            variant='contained'
                            onClick={deleteIngredient}
                        >
                            Eliminar
                        </Button>
                    )
                }
            </Box>
        </Grid>
    )
}

export default IngredientsManager