import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import ListPizzaIngredients from './ListPizzaIngredients'
import IngredientsManager from './IngredientsManager'
import ExtraIngredientsManager from './ExtraIngredientsManager'

import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

function PizzaIngredients({ pizza, handleChangeInput, pizzaNew, property, handleInputsChecked, errors, ...props }) {

    const extraIngredients = useSelector(
        (state) => state.extraIngredients
    );
    const [ingredientsList, setIngredientsList] = useState([])

    useEffect(() => {
        if (!extraIngredients) return
        const ingredientsList = []
        for (let ingredient in extraIngredients) {
            ingredientsList.push({
                ...extraIngredients[ingredient]
            })
        }
        setIngredientsList(ingredientsList)
    }, [extraIngredients])

    function handleIngredients(value) {
        setAllIngredients(value)
    }

    return (
        <Grid
            container
            direction={'column'}
            alignItems={'center'}
            spacing={2}
            sx={{
                width: '100%',
            }}
        >
            <Grid item>
                <Typography variant='title' sx={{ alignSelf: 'center' }}>
                    Ingredientes
                </Typography>
            </Grid>
            <Grid
                item
                container
                alignItems={'flex-start'}
                justifyContent={'space-between'}
                spacing={2}
            >
                <ListPizzaIngredients
                    pizza={pizza}
                    id={pizza.id}
                    handleChangeInput={handleChangeInput}
                    pizzaNew={pizzaNew}
                    property={property}
                    errorsIngredients={errors}
                    handleInputsChecked={handleInputsChecked}
                    {...props}
                />
                <Grid
                    container
                    item
                    xs={12}
                    sm={6}
                    md={8}
                    justifyContent={'center'}
                    spacing={3}
                >
                    <IngredientsManager
                        allIngredients={ingredientsList.map(ingredient => ingredient.name)}
                        handleIngredients={handleIngredients}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PizzaIngredients