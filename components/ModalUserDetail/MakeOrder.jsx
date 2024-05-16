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
import Divider from '@mui/material/Divider'

import SelectPizza from './SelectPizza'
import SelectStore from './SelectStore'
import SelectExtraData from './SelectExtraData'

import useGetProducts from '@/hooks/useGetProducts'
import useGetExtraIngredients from '@/hooks/useGetExtraIngredients'
import { useState, useEffect } from 'react'

import { getAllMasses, getAllSizes } from '@/services/pizzaCharacteristicsApi'
import { calculateTotalToPay } from '@/utils/priceCar'

function MakeOrder() {

    const [products, setProducts] = useState([{}])
    const [store, setStore] = useState(null)
    const [extraData, setExtraData] = useState({})

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

    function updateExtraData(value) {
        setExtraData(value)
    }

    function makeOrder() {
        console.log('creando orden...')
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
                    <Grid
                        key={`product${index}`}
                        item
                        container
                        spacing={2}
                    >
                        <SelectPizza
                            product={product}
                            index={index}
                            updateProduct={updateProduct}
                            handleRemoveProduct={handleRemoveProduct}
                        />
                        {
                            products.length > 1 && index < products.length -1 ? (
                                <Grid item xs={12}>
                                    <Divider sx={{ width: '100%' }} />
                                </Grid>
                            ) : null
                        }
                    </Grid>
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
            <Grid item xs={12}>
                <Divider sx={{ width: '100%' }} />
            </Grid>
            <SelectStore store={store} updateStore={updateStore} />
            <Grid item xs={12}>
                <Divider sx={{ width: '100%' }} />
            </Grid>
            <SelectExtraData extraData={extraData} updateExtraData={updateExtraData} />
            <Grid
                item
                sx={{
                    position: 'absolute',
                    top: '100%',
                    right: '0px'
                }}
            >
                <Button
                    variant='contained'
                    onClick={makeOrder}
                >
                    Crear Orden
                </Button>
            </Grid>
        </Grid>
    )
}

export default MakeOrder