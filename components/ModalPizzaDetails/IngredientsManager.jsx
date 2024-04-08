import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

import { useState } from 'react'

function IngredientsManager({ allIngredients }) {

    const [ingredientSelected, setIngredientSelected] = useState('')

    function handleChange(event) {
        setIngredientSelected(event.target.value)
    }

    return (
        <Box
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
                    onChange={handleChange}
                >
                    {
                        allIngredients.map(ingredient => (
                            <MenuItem value={ingredient} key={ingredient}>{ingredient}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}
            >
                <Button variant='contained'>Agregar</Button>
                <Button variant='contained'>Eliminar</Button>
            </Box>
        </Box>
    )
}

export default IngredientsManager