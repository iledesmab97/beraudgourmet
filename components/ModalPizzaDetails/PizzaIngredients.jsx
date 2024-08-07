import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import ListPizzaIngredients from './ListPizzaIngredients'
import IngredientsManager from './IngredientsManager'
import ExtraIngredientsManager from './ExtraIngredientsManager'

import { useState, useEffect } from 'react'
import useGetExtraIngredients from '@/hooks/useGetExtraIngredients'

import { getAllIngredients, getAllExtraIngredients } from '@/services/productApi'

function PizzaIngredients({ pizza, ingredients, id, handleChangeInput, pizzaNew, property, handleInputsChecked, errors, ...props }) {

    const [allIngredients, setAllIngredients] = useState([])
    const [allExtraIngredients, setAllExtraIngredients] = useState([])
    const { handleUpdateExtraIngredient, handleAddExtraIngredient, handleRemoveExtraIngredient } = useGetExtraIngredients()

    useEffect(() => {
        getAllIngredients()
            .then(totalListIngredients => setAllIngredients(totalListIngredients.map(ingredient => ingredient.name)))
        getAllExtraIngredients()
            .then(totalListExtraIngredients => setAllExtraIngredients(totalListExtraIngredients))
    }, [])

    function handleIngredients(value) {
        setAllIngredients(value)
    }

    function updateExtraIngredient(data) {
        const {id, properties} = data
        let index
        const newListExtraIngredinets = [...allExtraIngredients]
        let newExtraIngredient = newListExtraIngredinets.find((extra, i) => {
            if (extra.id !== id) return false
            index = i
            return true
        })
        newExtraIngredient = {
            ...data
        }
        newListExtraIngredinets[index] = newExtraIngredient
        setAllExtraIngredients(newListExtraIngredinets)
        const { name, cost, costIVAStripe, available } = data
        handleUpdateExtraIngredient({
            id,
            name,
            available,
            price: cost,
            totalPrice: costIVAStripe
        })
    }

    function addExtraIngredient(data) {
        const newListExtraIngredinets = [...allExtraIngredients]
        newListExtraIngredinets.push(data)
        setAllExtraIngredients(newListExtraIngredinets)
        const { id, name, cost, costIVAStripe, available } = data
        handleAddExtraIngredient({
            id,
            name,
            available,
            price: cost,
            totalPrice: costIVAStripe
        })
    }

    function removeExtraIngredientOfList(data) {
        const {id} = data
        const newAllExtraIngredients = [...allExtraIngredients].filter(extra => extra.id !== id)
        setAllExtraIngredients(newAllExtraIngredients)
        handleRemoveExtraIngredient(data)
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
                    id={id}
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
                        allIngredients={allIngredients}
                        handleIngredients={handleIngredients}
                    />
                    <ExtraIngredientsManager
                        allExtraIngredients={allExtraIngredients}
                        handleExtraIngredients={handleExtraIngredients}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PizzaIngredients