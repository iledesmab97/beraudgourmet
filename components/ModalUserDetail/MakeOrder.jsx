import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import useGetProducts from '@/hooks/useGetProducts'
import { useState, useEffect } from 'react'

function MakeOrder() {

    const { products } = useGetProducts({ type: 'pizzas'})
    const [ pizzas, setPizzas ] = useState( products ? products : [])
    const [pizzaSelected, setPizzaSelected] = useState(null)
    const [ingredinetsOut, setIngredientsOut] = useState([])

    useEffect(() => {
        if (!products) return
        setPizzas(products)
    }, [products])

    function handleChangeSelectPizza(event) {
        const pizza = pizzas.find(pizza => pizza.name === event.target.value)
        setPizzaSelected(pizza)
    }

    function handleChangePizzaIngredients(event) {
        const { value } = event.target
        setIngredientsOut(value)
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
            
            <Grid item>
                <Typography>Ingredientes extra</Typography>
            </Grid>
            <Grid item>
                <Typography>Cantidad</Typography>
            </Grid>
        </Grid>
    )
}

export default MakeOrder