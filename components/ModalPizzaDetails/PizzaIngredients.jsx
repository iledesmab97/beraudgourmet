import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import ListPizzaIngredients from './ListPizzaIngredients'
import IngredientsManager from './IngredientsManager'
import ExtraIngredientsManager from './ExtraIngredientsManager'

import { useState, useEffect } from 'react'
import { getAllIngredients, getAllExtraIngredients } from '@/services/productApi'

function PizzaIngredients({ ingredients, id, handleChangeInput, pizzaNew, property, errors, ...props }) {

    const [allIngredients, setAllIngredients] = useState([])
    const [allExtraIngredients, setAllExtraIngredients] = useState([])

    useEffect(() => {
        getAllIngredients()
            .then(totalListIngredients => setAllIngredients(totalListIngredients.map(ingredient => ingredient.name)))
        getAllExtraIngredients()
            // .then(totalListExtraIngredients => setAllExtraIngredients(totalListExtraIngredients.map(extra => extra.name)))
            .then(totalListExtraIngredients => setAllExtraIngredients(totalListExtraIngredients))
    }, [])

    function handleIngredients(value) {
        setAllIngredients(value)
    }

    function updateExtraIngredient(data) {
        const {id, property, value} = data
        let index
        const newListExtraIngredinets = [...allExtraIngredients]
        let [newExtraIngredient] = newListExtraIngredinets.filter((extra, i) => {
            if (extra.id !== id) return false
            index = i
            return true
        })
        newExtraIngredient = {
            ...newExtraIngredient,
            [property]: value
        }
        newListExtraIngredinets[index] = newExtraIngredient
        setAllExtraIngredients(newListExtraIngredinets)
    }

    function addExtraIngredient(data) {
        const { id, name, cost } = data
        const newListExtraIngredinets = [...allExtraIngredients]
        newListExtraIngredinets.push({id, name, cost})
        setAllExtraIngredients(newListExtraIngredinets)
    }

    function removeExtraIngredientOfList(data) {
        const {id} = data
        const newAllExtraIngredients = [...allExtraIngredients].filter(extra => extra.id !== id)
        setAllExtraIngredients(newAllExtraIngredients)
    }

    function handleExtraIngredients(data, operation) {
        switch (operation) {
            case 'update': {
                updateExtraIngredient(data)
                break
            }
            case 'add': {
                addExtraIngredient(data)
                break
            }
            case 'remove': {
                removeExtraIngredientOfList(data)
                break
            }
            default: {
                break
            }
        }
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
            <Grid
                container
                alignItems={'flex-start'}
                justifyContent={'space-between'}
                sx={{
                    // pr: '10%',
                    // display: 'flex',
                    // alignItems: 'flex-start',
                    // justifyContent: 'space-between'
                }}
            >
                <ListPizzaIngredients
                    ingredients={ingredients}
                    id={id}
                    allIngredients={allIngredients}
                    handleChangeInput={handleChangeInput}
                    pizzaNew={pizzaNew}
                    property={property}
                    errorsIngredients={errors}
                    {...props}
                />
                <Grid
                    container
                    item
                    xs={8}
                    direction={'column'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                    sx={{
                        display:'flex',
                        height: '100%',
                        gap: '32px'
                    }}
                >
                    <IngredientsManager
                        allIngredients={allIngredients}
                        handleIngredients={handleIngredients}
                    />
                    <ExtraIngredientsManager
                        allExtraIngredients={allExtraIngredients}
                        handleExtraIngredients={handleExtraIngredients}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default PizzaIngredients