import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import ListSaladIngredients from './ListSaladIngredients'
import IngredientsManager from '@/components/ModalPizzaDetails/IngredientsManager'

import { useState } from 'react'
import { useSelector } from "react-redux";

function SaladIngredients({ ingredients, updateSaladProperty, id, handleChangeInput, saladNew, property, handleInputsChecked, errors, ...props }) {

    const { extraIngredients } = useSelector(
        (state) => state
    );
    const [allIngredients, setAllIngredients] = useState(() => {
        const ingredientsList = []
        for (let ingredient in extraIngredients) {
            ingredientsList.push(ingredient)
        }
        return ingredientsList
    })

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
                <ListSaladIngredients
                    ingredients={ingredients}
                    updateSaladProperty={updateSaladProperty}
                    id={id}
                    allIngredients={allIngredients}
                    handleChangeInput={handleChangeInput}
                    saladNew={saladNew}
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
                        allIngredients={allIngredients}
                        handleIngredients={handleIngredients}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SaladIngredients