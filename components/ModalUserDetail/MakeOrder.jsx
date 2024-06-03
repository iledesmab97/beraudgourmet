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
import useGetAlertMessage from '@/hooks/useGetAlertMessage'
import useGetOrderList from '@/hooks/useGetOrderList'

import dayjs from 'dayjs'
import { getAllMasses, getAllSizes } from '@/services/pizzaCharacteristicsApi'
import { calculateTotalToPay } from '@/utils/priceCar'
import { descriptionOrder } from '@/utils/preparingData'
import { registerOrder } from '@/services/orderApi'
import { getAllOrders } from '@/services/orderApi'

const necessaryProductProperties = [ 'pizza', 'size', 'mass', 'quantity', 'totalCostByItem']

function MakeOrder({ user, updateOrders }) {

    const [products, setProducts] = useState([{}])
    const [store, setStore] = useState(null)
    const [extraData, setExtraData] = useState({})
    const { handleUpdateAlertMessage } = useGetAlertMessage()
    const [loading, setLoading] = useState(false)
    const [canMakeOrder, setCanMakeOrder] = useState(false)
    const { handleAddOrderList } = useGetOrderList()

    // Actualizar canMakeOrder para saber si ya se puede hacer una orden
    useEffect(() => {
        const isTherProduct = products.every(product => product.totalCostByItem ? true : false)
        const isThereStore = store ? true : false
        const isThereExtraData = Boolean(extraData.applicationDate && extraData.deliveryDate && extraData.paymentMethod )
        if ( isTherProduct && isThereStore && isThereExtraData ) return setCanMakeOrder(true)
        else if (canMakeOrder) return setCanMakeOrder(false)
        else return
    }, [products, store, extraData])

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

    function updateManyPropertiesProduct({ properties, index }) {
        const newProducts = [...products]
        newProducts[index] = {
            ...newProducts[index],
            ...properties
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

    async function makeOrder() {
        console.log('creando orden...')
        setLoading(true)
        const { applicationDate, deliveryDate, delivery, inputsHome, paymentMethod } = extraData
        const orderItems = products.map(item => {
            const { quantity, ingredientsOut, extraIngredients, costItemPerUnit, totalCostByItem} = item
            const { name } = item.pizza
            const { size } = item.size
            const mass = item.mass.name
            const extra = {}
            item.extraIngredients && item.extraIngredients.forEach(extraIngredient => {
                extra[extraIngredient.name] = extraIngredient.count
            })
            const description = descriptionOrder({
                name,
                itemType: 'pizza',
                quantity,
                size,
                mass,
                ingredientsModal: ingredientsOut ? ingredientsOut : [],
                extra
            })
            return {
                name,
                itemType: 'pizza',
                size,
                mass,
                quantity,
                ingredientsOut: ingredientsOut ? ingredientsOut : [],
                extraIngredients: (extraIngredients ? extraIngredients : [] ).map(extraIngredient => ({
                    name: extraIngredient.name,
                    quantity: extraIngredient.count
                })),
                costItemPerUnit,
                totalCostByItem,
                description
            }
        })
        const totalCostByItems = products.reduce((acc, cur) => acc + Number(cur.totalCostByItem), 0)
        const dataOrders = {
            userId: user.id,
            storeId: store.id,
            totalCostByItems,
            commissions: 0,
            totalCost: totalCostByItems,
            applicationDate: applicationDate.format('DD/MM/YYYY - HH:mm a'),
            deliveryDate: deliveryDate.format('DD/MM/YYYY - HH:mm a'),
            delivery,
            paymentMethod,
            itemsList: orderItems,
            deliveryInformation: delivery ? inputsHome : null
        }
        const response = await registerOrder(dataOrders)
        let text, status
        if (response.message) {
            text = response.message
            status = 'error'
        } else {
            text = 'Se ha creado la orden exitosamente'
            status = 'success'
        }
        handleUpdateAlertMessage({
            checked: true,
            text,
            status
        })
        if (!response.message) {
            updateOrders()
            console.log('Información guardada con exito')
            setLoading(false)
            getAllOrders()
                .then(data => {
                    if (data.message) throw new Error(data.message)
                    handleAddOrderList(data)
                })
                .catch(error => alert(error.message))
            return restartStates()
        }
        console.log('Ha ocurrido algún error')
        setLoading(false)
    }

    function restartStates() {
        setProducts([{}])
        setStore(null)
        setExtraData({})
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
                            updateManyPropertiesProduct={updateManyPropertiesProduct}
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
            <Grid
                item
                container
                xs={12}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Grid item>
                    <Button
                        variant='contained'
                        onClick={handleAddNumberOfProducts}
                    >
                        Añadir
                    </Button>
                </Grid>
                <Grid item xs={3} sm={2} >
                    <TextField
                        label={'Total ($)'}
                        value={ products.reduce((acc, cur) => acc + Number(cur.totalCostByItem ? cur.totalCostByItem : 0 ), 0) }
                        InputProps={{
                            readOnly: true,
                        }}
                        inputProps={{
                            sx:{
                                textAlign: 'right'
                            }
                        }}
                    />
                </Grid>
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
                    onClick={() => {makeOrder()}}
                    disabled={loading || !canMakeOrder}
                >
                    Crear Orden
                </Button>
            </Grid>
        </Grid>
    )
}

export default MakeOrder