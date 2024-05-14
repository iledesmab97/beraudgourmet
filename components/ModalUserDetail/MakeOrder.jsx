import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'

import useGetProducts from '@/hooks/useGetProducts'
import useGetExtraIngredients from '@/hooks/useGetExtraIngredients'
import { useState, useEffect } from 'react'

function MakeOrder() {

    const { products } = useGetProducts({ type: 'pizzas'})
    const { extraIngredients } = useGetExtraIngredients()
    const [ pizzas, setPizzas ] = useState( products ? products : [])
    const [pizzaSelected, setPizzaSelected] = useState(null)
    const [ingredinetsOut, setIngredientsOut] = useState([])
    const [extraIngredientsList, setExtraIngredients] = useState(() => {
        if (Object.keys(extraIngredients).length) return []
        const newList = []
        for (let extra in extraIngredients) {
            newList.push(extraIngredients[extra])
        }
        return newList
    })
    const [extraIngredientsSelected, setExtraIngredientsSelected] = useState([])

    useEffect(() => {
        if (!products) return
        setPizzas(products)
    }, [products])

    useEffect(() => {
        setExtraIngredients(() => {
            if (!Object.keys(extraIngredients).length) return []
            const newList = []
            for (let extra in extraIngredients) {
                newList.push(extraIngredients[extra])
            }
            return newList
        })
    }, [extraIngredients])

    function handleChangeSelectPizza(event) {
        const pizza = pizzas.find(pizza => pizza.name === event.target.value)
        setPizzaSelected(pizza)
    }

    function handleChangePizzaIngredients(event) {
        const { value } = event.target
        setIngredientsOut(value)
    }

    function handleChangeExtraIngredientsSelected(event) {
        const newList = event.target.value
        const newExtraIngredientsSelected = [...extraIngredientsSelected].filter(extraIngredient => newList.includes(extraIngredient.name))
        newList.forEach(extraIngredient => {
            if (!newExtraIngredientsSelected.some(extraIngredientNew => extraIngredientNew.name === extraIngredient)) {
                const newExtraIngredient = extraIngredientsList.find(totalExtraIngredient => totalExtraIngredient.name === extraIngredient )
                newExtraIngredientsSelected.push({
                    ...newExtraIngredient,
                    count: 0
                })
            }
        })
        setExtraIngredientsSelected(newExtraIngredientsSelected)
    }

    return (
        <Grid
            container
            spacing={2}
        >
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel>Pizza</InputLabel>
                    <Select
                        value={ pizzaSelected ? pizzaSelected.name : ''}
                        label='Pizza'
                        onChange={handleChangeSelectPizza}
                    >
                        {
                            pizzas.filter(pizza => pizza.status === 'ACTIVE').map(pizza => (
                                <MenuItem key={pizza.name} value={pizza.name} >{pizza.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Grid>
            {
                pizzaSelected ? (
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel>Ingredientes fuera</InputLabel>
                            <Select
                                multiple
                                value={ ingredinetsOut }
                                label='Ingredientes fuera'
                                onChange={handleChangePizzaIngredients}
                            >
                                {
                                    pizzaSelected.ingredients.map(ingredient => (
                                        <MenuItem key={ingredient} value={ingredient} >{ingredient}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                ) : null
            }
            
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Ingredientes extra</InputLabel>
                        <Select
                            multiple
                            value={ extraIngredientsSelected.map(extraIngredient => extraIngredient.name) }
                            label='Ingredientes extra'
                            onChange={handleChangeExtraIngredientsSelected}
                        >
                            {
                                extraIngredientsList.map(extraIngredient => (
                                    <MenuItem key={extraIngredient.name} value={extraIngredient.name} >{extraIngredient.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                {
                    extraIngredientsSelected.length ? (
                        <Grid item xs={3}>
                            <List>
                                {
                                    extraIngredientsSelected.map(extraIngredient => (
                                        <ListItem key={`extraIngredientSelected(${extraIngredient.name})`}>
                                            <ListItemText
                                                primary={
                                                    <Box>
                                                        <TextField
                                                            label={extraIngredient.name}
                                                            type='number'
                                                        />
                                                    </Box>
                                                }
                                            />
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Grid>
                    ) : null
                }
            </Grid>
            <Grid item>
                <Typography>Cantidad</Typography>
            </Grid>
        </Grid>
    )
}

export default MakeOrder