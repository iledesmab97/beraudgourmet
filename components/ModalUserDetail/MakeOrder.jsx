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

    useEffect(() => {
        if (!products) return
        setPizzas(products)
    }, [products])

    function handleChangeSelect(event) {
        const pizza = pizzas.find(pizza => pizza.name === event.target.value)
        setPizzaSelected(pizza)
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
                        onChange={handleChangeSelect}
                    >
                        {
                            pizzas.filter(pizza => pizza.status === 'ACTIVE').map(pizza => (
                                <MenuItem key={pizza.name} value={pizza.name} >{pizza.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item>
                <Typography>Ingredientes fuera</Typography>
            </Grid>
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