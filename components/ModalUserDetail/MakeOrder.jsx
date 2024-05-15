import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'

import SelectPizza from './SelectPizza'
import SelectStore from './SelectStore'

import useGetProducts from '@/hooks/useGetProducts'
import useGetExtraIngredients from '@/hooks/useGetExtraIngredients'
import { useState, useEffect } from 'react'

import { getAllMasses, getAllSizes } from '@/services/pizzaCharacteristicsApi'
import { calculateTotalToPay } from '@/utils/priceCar'

function MakeOrder() {

    const [products, setProducts] = useState([{}])
    const [store, setStore] = useState(null)

    function handleAddNumberOfProducts() {
        const newProducts = [...products]
        newProducts.push({})
        setProducts(newProducts)
    }

    function updateProduct({ property, value, index }) {
        const newProducts = [...products]
        newProducts[index] = {
            ...newProducts[index],
            [property]: value
        }
        setProducts(newProducts)
    }

    function handleRemoveProduct(index) {
        const newProducts = [...products].filter((product, i) => i !== index )
        setProducts(newProducts)
    }

    function updateStore(value) {
        setStore(value)
    }

    return (
        <Grid
            container
            spacing={2}
        >
            <Grid item xs={12}>
                <Typography variant='title'>Productos</Typography>
            </Grid>
            {
                products.map((product, index) => (
                    <SelectPizza
                        key={`product${index}`}
                        product={product}
                        index={index}
                        updateProduct={updateProduct}
                        handleRemoveProduct={handleRemoveProduct}
                    />
                ))
            }
            <Grid item xs={12}>
                <Button
                    variant='contained'
                    onClick={handleAddNumberOfProducts}
                >
                    Añadir
                </Button>
            </Grid>
            <SelectStore store={store} updateStore={updateStore} />
        </Grid>
    )
}

export default MakeOrder