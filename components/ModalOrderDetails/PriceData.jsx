
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import CancelIcon from '@mui/icons-material/Cancel'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

import CrossText from '@/components/CrossText/CrossText'

import { useState, useEffect, useRef } from 'react'
import useGetProducts from '@/hooks/useGetProducts'
import useGetExtraIngredients from '@/hooks/useGetExtraIngredients'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'
import useGetOrderList from '@/hooks/useGetOrderList'

import { extractElements, descriptionWithoutIngredientsOut, deepEqual, descriptionOrder, deepUnequal } from '@/utils/preparingData'
import { changeOrderItems, getAllOrders } from '@/services/orderApi'

function preparingDataForDescription(order) {
    const extra = {}
    order.extraIngredients.forEach(extraIngredient => {
        extra[extraIngredient.name] = extraIngredient.quantity
    })
    return {
        quantity: order.quantity,
        name: order.pizza.name,
        size: order.pizza.size,
        mass: order.pizza.masaType,
        extra,
        ingredientsModal: order.ingredientsOut[0] ? order.ingredientsOut : []
    }
}

function PriceData({ orders }) {

    const { products } = useGetProducts({type: 'pizzas'})
    const [currentOrders, setCurrentorders] = useState(() => {
        const { id, itemsxOrder, totalCost, totalCostByItems } = orders
        const newItemsxOrder = itemsxOrder.map(item => {
            const { ingredientsOut, pizza } = extractElements(item.description)
            const { size, masaType, name } = pizza
            const productFinded = products.find(p => p.name === name)
            return {
                ...item,
                ingredientsOut,
                pizza: {
                    ...pizza,
                    cost: productFinded ? productFinded.price[size][masaType] : '0'
                }
            }
        })
        return {
            id,
            itemsxOrder: newItemsxOrder,
            totalCost,
            totalCostByItems
        }
    })
    const [subElements, setSubElements] = useState(() => {
        const listOrders = currentOrders.itemsxOrder.map(order => {
            const { genericPizza } = extractElements(order.description)
            return {
                ...order,
                genericPizza
            }
        })
        return listOrders
    })
    const [openCollapse, setOpenCollapse] = useState(() => currentOrders.itemsxOrder.map(order => false))
    const [editing, setEditing] = useState(false)
    const { extraIngredients } = useGetExtraIngredients()
    const [pizzasList, setPizzasList] = useState([])
    const [extraIngredientsList, setExtraIngredientsList] = useState([])
    const orderUpdated = useRef(null)
    const { handleUpdateAlertMessage } = useGetAlertMessage()
    const { handleAddOrderList } = useGetOrderList()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!products) return
        setPizzasList(products.map(pizza => pizza.name))
    }, [products])

    useEffect(() => {
        if (!Object.keys(extraIngredients).length) return
        const newExtraIngredientsList = []
        for (let extraIngredient in extraIngredients) {
            newExtraIngredientsList.push(extraIngredient)
        }
        setExtraIngredientsList(newExtraIngredientsList)
    }, [extraIngredients])

    useEffect(() => {
        if (!orderUpdated.current) return
        const { orderIndex, property } = orderUpdated.current
        const { id } = currentOrders
        const newItemsxOrders = JSON.parse(JSON.stringify(subElements))
        if (property !== 'removeOrder') {
            let { costPerUnity, totalCostByItem, quantity } = newItemsxOrders[orderIndex]
            if (['extraIngredients', 'pizza'].includes(property)) {
                costPerUnity = Number(newItemsxOrders[orderIndex].pizza.cost) + newItemsxOrders[orderIndex].extraIngredients.reduce((acc, cur) => acc + Number(cur.cost), 0)
                totalCostByItem = costPerUnity * quantity
            }
            newItemsxOrders[orderIndex] = {
                ...newItemsxOrders[orderIndex],
                description: descriptionOrder(preparingDataForDescription(newItemsxOrders[orderIndex])),
                costPerUnity: String(costPerUnity),
                totalCostByItem: String(totalCostByItem)
            }
        }
        if (subElements.length !== currentOrders.itemsxOrder.length) setOpenCollapse(subElements.map((order, index) => false))
        setCurrentorders({
            id,
            totalCost: String(newItemsxOrders.reduce((acc, cur) => acc + Number(cur.totalCostByItem), 0)),
            totalCostByItems: String(newItemsxOrders.reduce((acc, cur) => acc + Number(cur.totalCostByItem), 0)),
            itemsxOrder: newItemsxOrders
        })
        orderUpdated.current = null
    }, [subElements])

    function handleChangeCollapse(indexCollapse) {
        const newOpenCollapse = openCollapse.map((element, index) => index === indexCollapse ? !element : element )
        setOpenCollapse(newOpenCollapse)
    }

    async function handleEditing() {
        if (editing) {
            const response = await updateDataOrder()
            if (response.message) return alert(response.message)
        }
        setEditing(prevState => !prevState)
    }

    function removeItemToCurrentListItems({orderIndex}) {
        const newSubElements = subElements.filter((element, index) => index !== orderIndex)
        orderUpdated.current = {orderIndex, property: 'removeOrder'}
        setSubElements(newSubElements)
    }

    function addItemToCurrentListItems() {
        const newSubElements = JSON.parse(JSON.stringify(subElements))

        const newPizza = products[0]
        const size = Object.keys(newPizza.price)[0]
        const mass = Object.keys(newPizza.price[size])[0]

        newSubElements.push({
            pizza: {
                name: newPizza.name,
                size,
                masaType: mass,
                quantityPizza: '1',
                cost: newPizza.price[size][mass],
            },
            extraIngredients: [],
            ingredientsOut: [],
            quantity: 1,
            costPerUnity: newPizza.price[size][mass],
            totalCostByItem: newPizza.price[size][mass],
        })

        const description = descriptionOrder(preparingDataForDescription(newSubElements[newSubElements.length - 1]))

        newSubElements[newSubElements.length - 1].description = description
        newSubElements[newSubElements.length - 1].genericPizza = extractElements(description).genericPizza

        orderUpdated.current = {orderIndex: newSubElements.length -1, property: 'removeOrder'}
        setSubElements(newSubElements)
    }

    function handleChangeQuantityPizza({newQuantity, orderIndex}) {

        if (Number.isNaN(Number(newQuantity)) || Number(newQuantity) < 0) return
        const newSubElements = JSON.parse(JSON.stringify(subElements))

        newSubElements[orderIndex].quantity = newQuantity
        orderUpdated.current = {orderIndex, property: 'pizza'}
        setSubElements(newSubElements)
    }

    function removeIngredientOut({orderIndex, ingredientIndex}) {
        const newSubElements = JSON.parse(JSON.stringify(subElements))
        newSubElements[orderIndex].ingredientsOut = newSubElements[orderIndex].ingredientsOut.filter((ingredientOut, index) => index !== ingredientIndex)
        orderUpdated.current = {orderIndex, property: 'ingredientsOut'}
        setSubElements(newSubElements)
    }

    function handleChangeIngredientOut({ orderIndex, ingredientIndex, newIngredientOut }) {

        if (newIngredientOut === null) return

        const newSubElements = JSON.parse(JSON.stringify(subElements))
        newSubElements[orderIndex].ingredientsOut[ingredientIndex] = newIngredientOut

        orderUpdated.current = {orderIndex, property: 'ingredientsOut'}
        setSubElements(newSubElements)
    }

    function removeExtraIngredient({extraIngredientIndex, orderIndex}) {
        const newSubElements = JSON.parse(JSON.stringify(subElements))
        newSubElements[orderIndex].extraIngredients = newSubElements[orderIndex].extraIngredients.filter((extra, index) => index !== extraIngredientIndex)
        orderUpdated.current = {orderIndex, property: 'extraIngredients'}
        setSubElements(newSubElements)
    }

    function handleChangeExtraIngredient({newExtraIngredient, extraIngredientIndex, orderIndex }) {

        if (newExtraIngredient === null) return

        const newSubElements = JSON.parse(JSON.stringify(subElements))

        const { quantity } = newSubElements[orderIndex].extraIngredients[extraIngredientIndex]
        const newExtraIngredientObject = {
            name: newExtraIngredient,
            costPerUnit: newExtraIngredient ? extraIngredients[newExtraIngredient].totalPrice : '0',
            quantity,
            cost: newExtraIngredient ? String(quantity * Number(extraIngredients[newExtraIngredient].totalPrice)) : '0'
        }

        newSubElements[orderIndex].extraIngredients[extraIngredientIndex] = newExtraIngredientObject
        orderUpdated.current = {orderIndex, property: 'extraIngredients'}
        setSubElements(newSubElements)
    }

    function handleChangeQuantityExtraIngredient({ newQuantity, extraIngredientIndex, orderIndex }) {
        if (Number.isNaN(Number(newQuantity)) || Number(newQuantity) < 0) return

        const newSubElements = JSON.parse(JSON.stringify(subElements))
        
        const lastExtraIngredientObject = newSubElements[orderIndex].extraIngredients[extraIngredientIndex]
        const newExtraIngredientObject = {
            ...lastExtraIngredientObject,
            quantity: newQuantity,
            cost: String(newQuantity * Number(lastExtraIngredientObject.costPerUnit))
        }

        newSubElements[orderIndex].extraIngredients[extraIngredientIndex] = newExtraIngredientObject
        orderUpdated.current = {orderIndex, property: 'extraIngredients'}
        setSubElements(newSubElements)
    }

    function handleChangePizza({newPizza, orderIndex }) {

        if (newPizza === null) return

        const newSubElements = JSON.parse(JSON.stringify(subElements))
        
        const { masaType, quantityPizza, size } = newSubElements[orderIndex].pizza

        const newPizzaObject = products.find(p => p.name === newPizza)

        const newSize = newPizzaObject.price[size] ? size : Object.keys(newPizzaObject.price)[0]
        const newMass = newPizzaObject.price[newSize][masaType] ? masaType : Object.keys(newPizzaObject.price[newSize])[0]

        newSubElements[orderIndex].pizza = {
            name: newPizza,
            quantityPizza,
            size: newSize,
            masaType: newMass,
            cost: newPizzaObject.price[newSize][newMass]
        }

        newSubElements[orderIndex].ingredientsOut = []
        orderUpdated.current = {orderIndex, property: 'pizza'}
        setSubElements(newSubElements)
    }

    function handleChangeSize({newSize, orderIndex}) {

        if (newSize === null) return

        const newSubElements = JSON.parse(JSON.stringify(subElements))
        const lastPizza = newSubElements[orderIndex].pizza
        const newPizzaObject = products.find(p => p.name === lastPizza.name)
        const newMass = newPizzaObject.price[newSize][lastPizza.masaType] ? newPizzaObject.price[newSize][lastPizza.masaType] : Object.keys(newPizzaObject.price[newSize])[0]

        newSubElements[orderIndex].pizza = {
            ...lastPizza,
            size: newSize,
            masaType: newMass,
            cost: newPizzaObject.price[newSize][newMass]
        }
        orderUpdated.current = {orderIndex, property: 'pizza'}
        setSubElements(newSubElements)
    }

    function handleChangeMass({ newMass, orderIndex }) {

        if (newMass === null) return

        const newSubElements = JSON.parse(JSON.stringify(subElements))
        const lastPizza = newSubElements[orderIndex].pizza
        const newPizzaObject = products.find(p => p.name === lastPizza.name)
        newSubElements[orderIndex].pizza = {
            ...lastPizza,
            masaType: newMass,
            cost: newPizzaObject.price[lastPizza.size][newMass]
        }
        orderUpdated.current = {orderIndex, property: 'pizza'}
        setSubElements(newSubElements)
    }

    function addItemToExtraIngredients({ orderIndex }) {

        const newSubElements = JSON.parse(JSON.stringify(subElements))
        const currentListExtas = newSubElements[orderIndex].extraIngredients
        const extraNameToAdd = extraIngredientsList.find(extra => !currentListExtas.map(e => e.name).includes(extra))

        if (!extraNameToAdd) return

        newSubElements[orderIndex].extraIngredients.push({
            name: extraNameToAdd,
            quantity: 1,
            costPerUnit: extraIngredients[extraNameToAdd].totalPrice,
            cost: extraIngredients[extraNameToAdd].totalPrice
        })

        orderUpdated.current = {orderIndex, property: 'extraIngredients'}
        setSubElements(newSubElements)
    }

    function addItemToIngredientsOut({ orderIndex }) {

        const newSubElements = JSON.parse(JSON.stringify(subElements))

        const currentListIngredientsOut = newSubElements[orderIndex].ingredientsOut
        const pizza = products.find(pizza => pizza.name === newSubElements[orderIndex].pizza.name)
        const ingredientToAdd = pizza.ingredients.find(ingredient => !currentListIngredientsOut.includes(ingredient))

        if (!ingredientToAdd) return

        newSubElements[orderIndex].ingredientsOut.push(ingredientToAdd)

        orderUpdated.current = {orderIndex, property: 'ingredientsOut'}
        setSubElements(newSubElements)
    }

    async function updateDataOrder() {

        setLoading(true)
        const orderToCompare = JSON.parse(JSON.stringify({...orders}))
        const { id, itemsxOrder, totalCost, totalCostByItems } = orderToCompare
        const newItemsxOrder = itemsxOrder.map(order => {
            const { ingredientsOut, pizza, genericPizza } = extractElements(order.description)
            return {
                ...order,
                ingredientsOut,
                pizza,
                genericPizza
            }
        })
        
        const currentOrdersToCompare = JSON.parse(JSON.stringify({...currentOrders}))
        
        for ( let order of currentOrdersToCompare.itemsxOrder ) {
            delete order.pizza.cost
        }

        console.log('Actualizando orden...')
        const differences = deepUnequal(currentOrdersToCompare, { id, itemsxOrder: newItemsxOrder, totalCost, totalCostByItems })

        if (!Object.keys(differences).length) {
            console.log('No hay cambios para actualizar')
            setLoading(false)
            return 'No hay cambios para actualizar'
        }
        const response = await changeOrderItems(differences)
        let text, status
        if (response.message) {
            text = response.message
            status = 'error'
        } else {
            text = response
            status = 'success'
        }
        handleUpdateAlertMessage({
            checked: true,
            text,
            status
        })
        if (!response.message) {
            getAllOrders().then(data => {
                handleAddOrderList(data)
            })
        }
        setLoading(false)
        return response
    }

    return (
        <Grid
            sx={{
                width: '100%'
            }}
        >
            {
                currentOrders.itemsxOrder && (
                    // subElements && (
                    <>
                        {
                            currentOrders.itemsxOrder.map((order, orderIndex) => (
                                // subElements.map((order, orderIndex) => (
                                <Grid container key={`order(${orderIndex})`}>
                                    <Grid
                                        item
                                        xs
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <Box sx={{ width: '100%', position: 'relative' }}>
                                            <List>
                                                <ListItem
                                                    sx={{
                                                        px: '0px',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <ListItemText
                                                        onClick={() => {
                                                            handleChangeCollapse(orderIndex)
                                                        }}
                                                        primary={
                                                        <Box
                                                            component={'div'}
                                                            sx={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between'
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    width: '85%',
                                                                }}
                                                            >
                                                                <Typography sx={{ display: 'inline' }}>
                                                                    {descriptionWithoutIngredientsOut(order.description)}
                                                                </Typography>
                                                                {
                                                                    extractElements(order.description).ingredientsOut.map((ingredient, index) => (
                                                                        <Typography component={'span'} sx={{ display: 'inline' }} key={`${ingredient}(${index})`}>, <CrossText component={'span'}>{ingredient}</CrossText></Typography>
                                                                    ))
                                                                }
                                                            </Box>
                                                            <Typography>
                                                                ${order.totalCostByItem}
                                                            </Typography>
                                                        </Box>
                                                        }
                                                    />
                                                </ListItem>
                                            </List>
                                            <Collapse in={openCollapse[orderIndex]} timeout={'auto'} unmountOnExit >
                                                <List>
                                                    <ListItemText
                                                        primary={
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    gap: '8px'
                                                                }}
                                                            >
                                                                <Box
                                                                    component={'div'}
                                                                    sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between'
                                                                    }}
                                                                >
                                                                    {
                                                                        editing ? (
                                                                            <Box
                                                                                sx={{
                                                                                    width: '80%',
                                                                                    fontSize: '0.875rem',
                                                                                    color: 'rgba(0, 0, 0, 0.6)',
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    gap: '8px'
                                                                                }}
                                                                            >
                                                                                <Autocomplete
                                                                                    value={order.pizza.name}
                                                                                    onChange={(event, newPizza) => { handleChangePizza({newPizza, orderIndex }) }}
                                                                                    options={pizzasList}
                                                                                    renderInput={(params) => {
                                                                                        return <TextField
                                                                                            variant='standard'
                                                                                            {...params}
                                                                                        />
                                                                                    }}
                                                                                    sx={{
                                                                                        width: '150px',
                                                                                        '& input': {
                                                                                            fontSize: '0.875rem',
                                                                                            color: 'rgba(0, 0, 0, 0.6)',
                                                                                            // textAlign: 'center'
                                                                                        }
                                                                                    }}
                                                                                />
                                                                                {'('}
                                                                                <Autocomplete
                                                                                    value={order.pizza.size}
                                                                                    onChange={(event, newSize) => { handleChangeSize({newSize, orderIndex}) }}
                                                                                    options={Object.keys(products.find(pizza => pizza.name === order.pizza.name).price)}
                                                                                    renderInput={(params) => {
                                                                                        return <TextField
                                                                                            variant='standard'
                                                                                            {...params}
                                                                                        />
                                                                                    }}
                                                                                    sx={{
                                                                                        width: '100px',
                                                                                        '& input': {
                                                                                            fontSize: '0.875rem',
                                                                                            color: 'rgba(0, 0, 0, 0.6)',
                                                                                            // textAlign: 'center'
                                                                                        }
                                                                                    }}
                                                                                />
                                                                                {'cm),'}
                                                                                <Autocomplete
                                                                                    value={order.pizza.masaType}
                                                                                    onChange={(event, newMass) => { handleChangeMass({ newMass, orderIndex }) }}
                                                                                    options={Object.keys(products.find(pizza => pizza.name === order.pizza.name).price[order.pizza.size])}
                                                                                    renderInput={(params) => {
                                                                                        return <TextField
                                                                                            variant='standard'
                                                                                            {...params}
                                                                                        />
                                                                                    }}
                                                                                    sx={{
                                                                                        width: '150px',
                                                                                        '& input': {
                                                                                            fontSize: '0.875rem',
                                                                                            color: 'rgba(0, 0, 0, 0.6)',
                                                                                            // textAlign: 'center'
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            </Box>
                                                                        ) : (
                                                                            <Typography
                                                                                sx={{
                                                                                    fontSize: '0.875rem',
                                                                                    color: 'rgba(0, 0, 0, 0.6)'
                                                                                }}
                                                                            >
                                                                                {'1 ' + subElements[orderIndex].genericPizza.slice(1)}
                                                                            </Typography>       
                                                                        )
                                                                    }
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: '0.875rem',
                                                                            color: 'rgba(0, 0, 0, 0.6)'
                                                                        }}
                                                                    >
                                                                        ${order.pizza.cost}
                                                                    </Typography>
                                                                </Box>
                                                                <Typography
                                                                    variant='title'
                                                                    sx={{
                                                                        mt: '8px',
                                                                        fontSize: '0.875rem'
                                                                    }}
                                                                >
                                                                    Ingredientes Extra
                                                                </Typography>
                                                                {
                                                                    order.extraIngredients.map((extraIngredient, extraIngredientIndex, listExtraIngredients) => (
                                                                        <Box
                                                                            key={extraIngredient.name + String(extraIngredientIndex)}
                                                                            component={'div'}
                                                                            sx={{
                                                                            display: 'flex',
                                                                            justifyContent: 'space-between',
                                                                            alignItems: 'center'
                                                                            }}
                                                                        >
                                                                            {
                                                                                editing ? (
                                                                                    <Box
                                                                                        sx={{
                                                                                            position: 'relative',
                                                                                            width: 'fit-content',
                                                                                            fontSize: '0.875rem',
                                                                                            color: 'rgba(0, 0, 0, 0.6)',
                                                                                            display: 'flex',
                                                                                            alignItems: 'center',
                                                                                            gap: '8px'
                                                                                        }}
                                                                                    >
                                                                                        <TextField
                                                                                            value={`${extraIngredient.quantity}`}
                                                                                            onChange={(event) => {handleChangeQuantityExtraIngredient({ newQuantity: event.target.value, extraIngredientIndex, orderIndex })}}
                                                                                            variant='standard'
                                                                                            sx={{
                                                                                                width: '32px',
                                                                                            }}
                                                                                            inputProps={{
                                                                                                style: {
                                                                                                    fontSize: '0.875rem',
                                                                                                    textAlign: 'center',
                                                                                                    color: 'rgba(0, 0, 0, 0.6)'
                                                                                                }
                                                                                            }}
                                                                                        />
                                                                                        x
                                                                                        <Autocomplete
                                                                                            value={ extraIngredient.name }
                                                                                            onChange={(event, newExtraIngredient) => { handleChangeExtraIngredient({newExtraIngredient, extraIngredientIndex, orderIndex}) }}
                                                                                            options={extraIngredientsList}
                                                                                            getOptionDisabled={(option) => listExtraIngredients.map(extra => extra.name).includes(option)}
                                                                                            renderInput={(params) => {
                                                                                                return <TextField
                                                                                                    variant='standard'
                                                                                                    {...params}
                                                                                                />
                                                                                            }}
                                                                                            sx={{
                                                                                                width: '150px',
                                                                                                '& input': {
                                                                                                    fontSize: '0.875rem',
                                                                                                    color: 'rgba(0, 0, 0, 0.6)',
                                                                                                    // textAlign: 'center'
                                                                                                }
                                                                                            }}
                                                                                        />
                                                                                        <Typography>{`($${extraIngredient.costPerUnit} c/u)`}</Typography>
                                                                                        <Box
                                                                                            sx={{
                                                                                                transform: 'scale(0.8)'
                                                                                            }}
                                                                                        >
                                                                                            <IconButton
                                                                                                onClick={() => {removeExtraIngredient({extraIngredientIndex, orderIndex})}}
                                                                                                sx={{ p: '0px' }}
                                                                                            >
                                                                                                <CancelIcon
                                                                                                    sx={{
                                                                                                        color: '#f6685e'
                                                                                                    }} />
                                                                                            </IconButton>
                                                                                        </Box>
                                                                                    </Box>

                                                                                ) : (
                                                                                    <Typography
                                                                                        sx={{
                                                                                            fontSize: '0.875rem',
                                                                                            color: 'rgba(0, 0, 0, 0.6)'
                                                                                        }}
                                                                                    >
                                                                                        {`${extraIngredient.quantity} x ${extraIngredient.name} ($${extraIngredient.costPerUnit} c/u)`}
                                                                                    </Typography>
                                                                                )
                                                                            }
                                                                            <Typography
                                                                                sx={{
                                                                                    fontSize: '0.875rem',
                                                                                    color: 'rgba(0, 0, 0, 0.6)'
                                                                                }}
                                                                            >
                                                                                ${extraIngredient.cost}
                                                                            </Typography>
                                                                        </Box>
                                                                    ))
                                                                }
                                                                {
                                                                    editing ? (
                                                                        <Box>
                                                                            <IconButton
                                                                                onClick={() => {addItemToExtraIngredients({orderIndex})}}
                                                                            >
                                                                                <AddCircleOutlineIcon />
                                                                            </IconButton>
                                                                        </Box>
                                                                    ) : null
                                                                }
                                                                <Typography
                                                                    variant='title'
                                                                    sx={{
                                                                        fontSize: '0.875rem'
                                                                    }}
                                                                >
                                                                    Quitar ingredientes
                                                                </Typography>
                                                                {
                                                                    order.ingredientsOut.map((ingredient, ingredientIndex, listIngredintsOut) => (
                                                                        <Box
                                                                            key={ingredient + String(ingredientIndex)}
                                                                            component={'div'}
                                                                            sx={{
                                                                                position: 'relative',
                                                                                width: 'fit-content',
                                                                                display: 'flex',
                                                                                justifyContent: 'space-between'
                                                                            }}
                                                                        >
                                                                            {
                                                                                editing ? (
                                                                                    <>
                                                                                        <Autocomplete
                                                                                            value={ingredient}
                                                                                            onChange={( event, newIngredientOut ) => { handleChangeIngredientOut({ orderIndex, ingredientIndex, newIngredientOut }) } }
                                                                                            options={products.find(pizza => pizza.name === order.pizza.name).ingredients}
                                                                                            getOptionDisabled={(option) => listIngredintsOut.includes(option)}
                                                                                            renderInput={(params) => {
                                                                                                return <TextField
                                                                                                    variant='standard'
                                                                                                    {...params}
                                                                                                />
                                                                                            }}
                                                                                            sx={{
                                                                                                width: '150px',
                                                                                                '& input': {
                                                                                                    fontSize: '0.875rem',
                                                                                                    color: 'rgba(0, 0, 0, 0.6)',
                                                                                                    textDecoration: 'line-through'
                                                                                                    // textAlign: 'center'
                                                                                                }
                                                                                            }}
                                                                                        />
                                                                                        <Box
                                                                                            sx={{
                                                                                                position: 'absolute',
                                                                                                top: '0px',
                                                                                                left: '100%',
                                                                                                transform: 'scale(0.8)'
                                                                                            }}
                                                                                        >
                                                                                            <IconButton
                                                                                                onClick={() => {removeIngredientOut({ingredientIndex, orderIndex})}}
                                                                                            >
                                                                                                <CancelIcon
                                                                                                    sx={{
                                                                                                        // scale: 2,
                                                                                                        color: '#f6685e'
                                                                                                    }} />
                                                                                            </IconButton>
                                                                                        </Box>
                                                                                    </>
                                                                                ) : (
                                                                                    <Typography
                                                                                        sx={{
                                                                                            fontSize: '0.875rem',
                                                                                            color: 'rgba(0, 0, 0, 0.6)',
                                                                                            textDecoration: 'line-through'
                                                                                        }}
                                                                                    >
                                                                                        {`${ingredient}`}
                                                                                    </Typography>
                                                                                )
                                                                            }
                                                                        </Box>
                                                                    ))
                                                                }
                                                                {
                                                                    editing ? (
                                                                        <Box>
                                                                            <IconButton
                                                                                onClick={() => {addItemToIngredientsOut({orderIndex})}}
                                                                            >
                                                                                <AddCircleOutlineIcon />
                                                                            </IconButton>
                                                                        </Box>
                                                                    ) : null
                                                                }
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        justifyContent: 'space-between',
                                                                        mt: '16px',
                                                                        color: 'rgba(0, 0, 0, 0.6)'
                                                                    }}
                                                                >
                                                                    <Typography>Sub Total</Typography>
                                                                    <Box
                                                                        sx={{
                                                                            display: 'flex',
                                                                            alignItems: 'baseline',
                                                                            gap: '16px'
                                                                        }}
                                                                    >
                                                                        <TextField
                                                                            // value={'1'}
                                                                            value={order.quantity}
                                                                            onChange={(event) => {handleChangeQuantityPizza({newQuantity: event.target.value, orderIndex})}}
                                                                            variant='standard'
                                                                            sx={{
                                                                                width: '32px',
                                                                            }}
                                                                            inputProps={{
                                                                                style: {
                                                                                    // fontSize: '0.875rem',
                                                                                    textAlign: 'center',
                                                                                    color: 'rgba(0, 0, 0, 0.6)'
                                                                                }
                                                                            }}
                                                                            disabled={!editing}
                                                                        />
                                                                        <Typography>
                                                                            {/* ${Number(order.pizza.cost) + order.extraIngredients.reduce((acc, cur) => acc + Number(cur.cost) , 0)} */}
                                                                            ${order.costPerUnity}
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        justifyContent: 'space-between',
                                                                        color: 'rgba(0, 0, 0, 0.6)'
                                                                    }}
                                                                >
                                                                    <Typography>Total</Typography>
                                                                    <Typography>
                                                                        {/* ${order.quantity * (Number(order.pizza.cost) + order.extraIngredients.reduce((acc, cur) => acc + Number(cur.cost) , 0))} */}
                                                                        ${order.totalCostByItem}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        }
                                                    />
                                                </List>
                                            </Collapse>
                                            <Divider />
                                            {
                                                editing && orderIndex > 0 ? (
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            top: '8px',
                                                            left: '100%',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'baseline'
                                                        }}>
                                                        <IconButton
                                                            onClick={() => {removeItemToCurrentListItems({orderIndex})}}
                                                        >
                                                            <CancelIcon sx={{ color: '#f6685e'}} />
                                                        </IconButton>
                                                    </Box>
                                                ) : null
                                            }
                                        </Box>
                                    </Grid>
                                    {
                                        editing ? (
                                            <Grid item xs={0.7} />
                                        ) : null
                                    }
                                </Grid>
                            ))
                        }

                        {
                            editing ? (
                                <Box>
                                    <IconButton
                                        onClick={addItemToCurrentListItems}
                                    >
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                </Box>
                            ) : null
                        }

                        <List>
                            <ListItem
                                sx={{
                                    pr: '0px',
                                    pl: '0px',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Typography>
                                    {`Total Carrito (MXN) incl. IVA`} 
                                </Typography>
                                <Typography>
                                    ${currentOrders.totalCostByItems}
                                </Typography>
                            </ListItem>
                            {/* {
                                currentOrders.paymentMethod === 'stripe' && (
                                    <>
                                        <ListItem
                                            sx={{
                                                pr: '0px',
                                                pl: '0px',
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <Typography>
                                                Comisión Stripe:
                                            </Typography>
                                            <Typography>
                                                ${ currentOrders.commissions }
                                            </Typography>
                                        </ListItem>
                                    </>
                                )
                            } */}
                        </List>

                    </>
                )
            }
            
            <Box
                sx={{
                    pt: '8px',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >    
                <Typography variant='title'>
                    Total
                </Typography>
                <Typography>
                    {`$${currentOrders.totalCost}`}
                </Typography>
            </Box>
            <Box
                sx={{
                    pt: '8px',
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
            >    
                <IconButton
                    onClick={handleEditing}
                    disabled={loading}
                >
                    {
                        editing ? (
                            <CheckIcon />
                        ) : (
                            <EditIcon />
                        )
                    }
                </IconButton>
            </Box>
        </Grid>
    )
}

export default PriceData