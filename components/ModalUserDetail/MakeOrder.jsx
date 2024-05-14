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

import { getAllMasses, getAllSizes } from '@/services/pizzaCharacteristicsApi'

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
    const [quantity, setQuantity] = useState(1)
    const [massList, setMassList] = useState([])
    const [sizeList, setSizeList] = useState([])
    const [massSelected, setMassSelected] = useState(null)
    const [sizeSelected, setSizeSelected] = useState(null)

    useEffect(() => {
        if (!products) return
        setPizzas(products)
    }, [products])

    useEffect(() => {
        if (extraIngredientsList.length) return
        setExtraIngredients(() => {
            if (!Object.keys(extraIngredients).length) return []
            const newList = []
            for (let extra in extraIngredients) {
                newList.push(extraIngredients[extra])
            }
            return newList
        })
    }, [extraIngredients])

    useEffect(() => {
        if (!massList.length) {
            getAllMasses().then(data => {
                setMassList(data)
            })
        }
        if (!sizeList.length) {
            getAllSizes().then(data => {
                setSizeList(data)
            })
        }
    }, [])

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
                    count: 1
                })
            }
        })
        setExtraIngredientsSelected(newExtraIngredientsSelected)
    }

    function handleChangeQuantityExtraIngredientsSelected(event, index) {
        const number = Number(event.target.value)
        if (Number.isNaN(number) || number < 1) return
        const newExtraIngredientsSelected = [...extraIngredientsSelected]
        newExtraIngredientsSelected[index] = {
            ...newExtraIngredientsSelected[index],
            count: number
        }
        setExtraIngredientsSelected(newExtraIngredientsSelected)
    }

    function handleChangeMassSelected(event) {
        const { value } = event.target
        const newMassSelected = massList.find(mass => mass.name === value)
        setMassSelected(newMassSelected)
    }

    function handleChangeSizeSelected(event) {
        const { value } = event.target
        const newSizeSelected = sizeList.find(size => size.size === value)
        setSizeSelected(newSizeSelected)
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
                            <InputLabel>Tamaño</InputLabel>
                            <Select
                                value={ sizeSelected ? sizeSelected.size : ''}
                                label='Tamaño'
                                onChange={handleChangeSizeSelected}
                            >
                                {
                                    sizeList.map(size => (
                                        <MenuItem key={size.size} value={size.size} >{size.size}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                ) : null
            }
            {
                sizeSelected ? (
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel>Masa</InputLabel>
                            <Select
                                value={ massSelected ? massSelected.name : ''}
                                label='Masa'
                                onChange={handleChangeMassSelected}
                            >
                                {
                                    massList.map(mass => (
                                        <MenuItem key={mass.name} value={mass.name} >{mass.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                ) : null
            }
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

            <Grid
                container
                item
                xs={4}
                spacing={1}
                alignItems={'center'}
            >
                <Grid item xs={7}>
                    <TextField
                        label={'Cantidad'}
                        type='number'
                        // value={extraIngredient.count}
                        // onChange={(event) => handleChangeQuantityExtraIngredientsSelected(event, index)}
                        inputProps={{
                            sx:{
                                textAlign: 'center'
                            }
                        }}
                    />
                </Grid>
                <Grid
                    item
                    sx={{
                        width: 'fit-content'
                    }}
                >
                    <Typography>:</Typography>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label={'Total'}
                        // value={extraIngredient.count * extraIngredient.price}
                        InputProps={{
                            readOnly: true,
                        }}
                        inputProps={{
                            sx:{
                                textAlign: 'center'
                            }
                        }}
                    />
                </Grid>
            </Grid>
            
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
                        <Grid item xs={6}>
                            <List>
                                {
                                    extraIngredientsSelected.map((extraIngredient, index) => (
                                        <ListItem key={`extraIngredientSelected(${extraIngredient.name})`}>
                                            <ListItemText
                                                primary={
                                                    <Grid
                                                        container
                                                        spacing={1}
                                                        alignItems={'center'}
                                                    >
                                                        <Grid item xs={5}>
                                                            <TextField
                                                                label={extraIngredient.name}
                                                                type='number'
                                                                value={extraIngredient.count}
                                                                onChange={(event) => handleChangeQuantityExtraIngredientsSelected(event, index)}
                                                                inputProps={{
                                                                    sx:{
                                                                        textAlign: 'center'
                                                                    }
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            sx={{
                                                                width: 'fit-content'
                                                            }}
                                                        >
                                                            <Typography>:</Typography>
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <TextField
                                                                label={'Costo'}
                                                                value={extraIngredient.count * extraIngredient.price}
                                                                InputProps={{
                                                                    readOnly: true,
                                                                }}
                                                                inputProps={{
                                                                    sx:{
                                                                        textAlign: 'center'
                                                                    }
                                                                }}
                                                            />
                                                        </Grid>
                                                    </Grid>
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
        </Grid>
    )
}

export default MakeOrder