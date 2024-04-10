import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import ListPizzaIngredients from './ListPizzaIngredients'
import IngredientsManager from './IngredientsManager'

import { useState, useEffect } from 'react'
import { getAllIngredients } from '@/services/productApi'

function PizzaIngredients({ ingredients, id, handleChangeInput, pizzaNew, property, ...props }) {

    const [allIngredients, setAllIngredients] = useState([])

    useEffect(() => {
        getAllIngredients()
            .then(totalListIngredients => setAllIngredients(totalListIngredients.map(ingredient => ingredient.name)))
    }, [])

    function handleIngredients(value) {
        setAllIngredients(value)
    }

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Typography variant='title' sx={{ alignSelf: 'center' }}>
                Ingredientes
            </Typography>
            <Box
                sx={{
                    pr: '10%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between'
                }}
            >
                <ListPizzaIngredients
                    ingredients={ingredients}
                    id={id}
                    allIngredients={allIngredients}
                    handleChangeInput={handleChangeInput}
                    pizzaNew={pizzaNew}
                    property={property}
                    {...props}
                />
                <IngredientsManager
                    allIngredients={allIngredients}
                    handleIngredients={handleIngredients}
                />
            </Box>
        </Box>
    )
}

export default PizzaIngredients