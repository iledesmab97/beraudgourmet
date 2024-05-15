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
import IconButton from '@mui/material/IconButton'

import CancelIcon from '@mui/icons-material/Cancel';

import useGetProducts from '@/hooks/useGetProducts'
import useGetExtraIngredients from '@/hooks/useGetExtraIngredients'
import { useState, useEffect } from 'react'

import { getAllMasses, getAllSizes } from '@/services/pizzaCharacteristicsApi'
import { calculateTotalToPay } from '@/utils/priceCar'

function SelectPizza({ product, index, updateProduct, handleRemoveProduct }) {

    const { products } = useGetProducts({ type: 'pizzas'})
    const { extraIngredients } = useGetExtraIngredients()
    const [ pizzas, setPizzas ] = useState( products ? products : [])
    const [massList, setMassList] = useState([])
    const [sizeList, setSizeList] = useState([])
    const [extraIngredientsList, setExtraIngredients] = useState(() => {
        if (Object.keys(extraIngredients).length) return []
        const newList = []
        for (let extra in extraIngredients) {
            newList.push(extraIngredients[extra])
        }
        return newList
    })
    const [quantity, setQuantity] = useState(1)
    
    useEffect(() => {
        if (!products) return
        setPizzas(products)
    }, [products])

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

    function handleChangeSelectPizza(event) {
        const pizza = pizzas.find(pizza => pizza.name === event.target.value)
        updateProduct({ property: 'pizza', value: pizza, index})
    }

    function handleChangeSizeSelected(event) {
        const { value } = event.target
        const newSizeSelected = sizeList.find(size => size.size === value)
        updateProduct({ property: 'size', value: newSizeSelected, index})
    }

    function handleChangeMassSelected(event) {
        const { value } = event.target
        const newMassSelected = massList.find(mass => mass.name === value)
        updateProduct({ property: 'mass', value: newMassSelected, index })
    }

    function handleChangePizzaIngredients(event) {
        const { value } = event.target
        updateProduct({ property: 'ingredientsOut', value, index })
    }

    function handleChangeExtraIngredientsSelected(event) {
        const newList = event.target.value
        const listExtraIngredients = product.extraIngredients ? product.extraIngredients : []
        const newExtraIngredientsSelected = listExtraIngredients.filter(extraIngredient => newList.includes(extraIngredient.name))
        newList.forEach(extraIngredient => {
            if (!newExtraIngredientsSelected.some(extraIngredientNew => extraIngredientNew.name === extraIngredient)) {
                const newExtraIngredient = extraIngredientsList.find(totalExtraIngredient => totalExtraIngredient.name === extraIngredient )
                newExtraIngredientsSelected.push({
                    ...newExtraIngredient,
                    count: 1,
                    total: newExtraIngredient.totalPrice
                })
            }
        })
        updateProduct({ property: 'extraIngredients', value: newExtraIngredientsSelected, index })
    }

    function handleChangeQuantityExtraIngredientsSelected(event, indexExtraIngredients) {
        const number = Number(event.target.value)
        if (Number.isNaN(number) || number < 1) return
        const newExtraIngredientsSelected = [...product.extraIngredients]
        newExtraIngredientsSelected[indexExtraIngredients] = {
            ...newExtraIngredientsSelected[indexExtraIngredients],
            count: number,
            total: number * newExtraIngredientsSelected[indexExtraIngredients].totalPrice
        }
        updateProduct({ property: 'extraIngredients', value: newExtraIngredientsSelected, index})
    }

    function handleChangeQuantityPizzas(event) {
        setQuantity(event.target.value)
    }

    return (
        <Grid
            container
            item
            spacing={2}
            sx={{
                width: '97%',
                position: 'relative'
            }}
        >
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel>Pizza</InputLabel>
                    <Select
                        value={ product.pizza ? product.pizza.name : ''}
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
                product.pizza ? (
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel>Tamaño</InputLabel>
                            <Select
                                value={ product.size ? product.size.size : ''}
                                label='Tamaño'
                                onChange={handleChangeSizeSelected}
                            >
                                {
                                    Object.keys(product.pizza.price).map(size => (
                                        <MenuItem key={size} value={size} >{size}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                ) : null
            }
            {
                product.size ? (
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel>Masa</InputLabel>
                            <Select
                                value={ product.mass ? product.mass.name : ''}
                                label='Masa'
                                onChange={handleChangeMassSelected}
                            >
                                {
                                    Object.keys(product.pizza.price[product.size.size]).map(mass => (
                                        <MenuItem key={mass} value={mass} >{mass}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                ) : null
            }
            {
                product.pizza ? (
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel>Ingredientes fuera</InputLabel>
                            <Select
                                multiple
                                value={ product.ingredientsOut ? product.ingredientsOut : [] }
                                label='Ingredientes fuera'
                                onChange={handleChangePizzaIngredients}
                            >
                                {
                                    product.pizza.ingredients.map(ingredient => (
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
                            value={ product.extraIngredients ? product.extraIngredients.map(extraIngredient => extraIngredient.name ) : []}
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
                    product.extraIngredients && product.extraIngredients.length ? (
                        <Grid item xs={6}>
                            <List>
                                {
                                    product.extraIngredients.map((extraIngredient, index) => (
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
                                                                value={ extraIngredient.total }
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
                {
                    product.pizza && product.size && product.mass ? (
                        <Grid
                            container
                            item
                            xs={4}
                            spacing={1}
                            alignItems={'center'}
                        >
                            <Grid item xs={6}>
                                <TextField
                                    label={'Cantidad'}
                                    type='number'
                                    value={quantity}
                                    onChange={handleChangeQuantityPizzas}
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
                            <Grid item xs={5}>
                                <TextField
                                    label={'Total'}
                                    value={ quantity * ( calculateTotalToPay(product.pizza.price[product.size.size][product.mass.name], product.extraIngredients ? product.extraIngredients : [] )  ) }
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
                    ) : null
                }
                
            </Grid>
            {
                index ? (
                    <Grid
                        sx={{
                            position: 'absolute',
                            top: '16px',
                            left: '100%'
                        }}
                    >
                        <IconButton
                            onClick={() => {handleRemoveProduct(index)}}
                            sx={{
                                color: '#f6685e'
                            }}
                        >
                            <CancelIcon />
                        </IconButton>
                    </Grid>
                ) : null
            }
        </Grid>
    )
}

export default SelectPizza