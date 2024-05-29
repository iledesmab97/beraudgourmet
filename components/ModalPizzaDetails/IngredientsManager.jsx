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
    const [loading, setLoading] = useState(false)

    function handleChange(value) {
        setIngredientSelected(value)
    }

    async function addNewIngredient() {
        setLoading(true)
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
        setLoading(false)
    }

    async function deleteIngredient() {
        setLoading(true)
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
        if (!response.message) {
            setIngredientSelected('')
            handleIngredients([...allIngredients].filter(ingredient => ingredient !== ingredientSelected))
        }
        setLoading(false)
    }

    function changeIngredientName(event) {
        setIngredientName(event.target.value)
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
                <Typography variant='title'>Buscar Ingrediente</Typography>
            </Grid>
            <Grid item sx={{ minWidth: '150px'}}>
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
            </Grid>
            {
                ingredientSelected === 'Nuevo Ingrediente' ? (
                    <Grid item>
                        <TextField
                            value={ingredientName}
                            onChange={changeIngredientName}
                        />
                    </Grid>

                ) : null
            }
            <Grid item>
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
                                disabled={loading}
                            >
                                Agregar
                            </Button>
                        ) : (
                            <Button
                                variant='contained'
                                onClick={deleteIngredient}
                                disabled={loading}
                            >
                                Eliminar
                            </Button>
                        )
                    }
                </Box>
            </Grid>
        </Grid>
    )
}

export default IngredientsManager