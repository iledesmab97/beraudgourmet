
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

import { useState, useEffect } from 'react'
import useGetProducts from '@/hooks/useGetProducts'
import useGetExtraIngredients from '@/hooks/useGetExtraIngredients'

import { extractElements, descriptionWithoutIngredientsOut } from '@/utils/preparingData'

function PriceData({ orders }) {

    const [currentOrders, setCurrentorders] = useState(() => {
        const { id, itemsxOrder, totalCost, totalCostByItems } = orders
        const newItemsxOrder = itemsxOrder.map(item => {
            const { ingredientsOut, pizza } = extractElements(item.description)
            return {
                ...item,
                ingredientsOut,
                pizza: {
                    ...pizza,
                    cost: item.costPerUnity
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
        const listOrders = currentOrders.itemsxOrder.map(order => extractElements(order.description))
        return listOrders
    })
    const [openCollapse, setOpenCollapse] = useState(() => currentOrders.itemsxOrder.map(order => false))
    const [editing, setEditing] = useState(false)
    const { products } = useGetProducts({type: 'pizzas'})
    const { extraIngredients } = useGetExtraIngredients()
    const [pizzasList, setPizzasList] = useState([])
    const [extraIngredientsList, setExtraIngredientsList] = useState([])

    // useEffect(() => {
    //     console.log('currentOrders:', currentOrders)
    //     console.log('products:', products)
    // }, [currentOrders])

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

    function handleChangeCollapse(indexCollapse) {
        const newOpenCollapse = openCollapse.map((element, index) => index === indexCollapse ? !element : element )
        setOpenCollapse(newOpenCollapse)
    }

    async function handleEditing() {
        // if (editing && userSelected.id !== user.id) {
        //     const response = await updateDataUser()
        //     if (response.message) return
        // }
        setEditing(prevState => !prevState)
    }

    function removeItemToCurrentListItems(index) {
        const newCurrentOrderList = [...currentOrders.itemsxOrder].filter((item, i) => i !== index)
        const newTotalCostByItems = newCurrentOrderList.reduce((acc, cur) => acc + Number(cur.totalCostByItem), 0)
        const newCurrentOrders = {
            ...currentOrders,
            itemsxOrder: newCurrentOrderList,
            totalCostByItems: newTotalCostByItems,
            totalCost: newTotalCostByItems
        }
        setCurrentorders(newCurrentOrders)
    }

    function addItemToCurrentListItems() {
        console.log('añadiendo elemento a la lista del pedido')
    }

    function handleChangeQuantityPizza({newQuantity, orderIndex}) {
        
        if (Number.isNaN(Number(newQuantity)) || Number(newQuantity) < 0) return
        const newCurrentOrders = JSON.parse(JSON.stringify(currentOrders))

        newCurrentOrders.itemsxOrder[orderIndex].quantity = newQuantity

        setCurrentorders(newCurrentOrders)
    }

    function removeIngredientOut({orderIndex, ingredientIndex}) {
        const newItemsxOrder = [...currentOrders.itemsxOrder]
        newItemsxOrder[orderIndex] = {
            ...newItemsxOrder[orderIndex],
            ingredientsOut: newItemsxOrder[orderIndex].ingredientsOut.filter((ingredientOut, index) => index !== ingredientIndex)
        }
        const newCurrentOrders = {
            ...currentOrders,
            itemsxOrder: newItemsxOrder
        }
        setCurrentorders(newCurrentOrders)
    }

    function handleChangeIngredientOut({ orderIndex, ingredientIndex, newIngredientOut }) {
        const newListIngredientsOut = [...currentOrders.itemsxOrder[orderIndex].ingredientsOut]
        newListIngredientsOut[ingredientIndex] = newIngredientOut
        const newCurrentOrders = {
            ...currentOrders,
        }
        newCurrentOrders.itemsxOrder[orderIndex].ingredientsOut = newListIngredientsOut
        setCurrentorders(newCurrentOrders)
    }

    function removeExtraIngredient({extraIngredientIndex, orderIndex}) {
        const newCurrentOrders = {
            ...currentOrders,
        }
        newCurrentOrders.itemsxOrder[orderIndex].extraIngredients = newCurrentOrders.itemsxOrder[orderIndex].extraIngredients.filter((extra, index) => index !== extraIngredientIndex)
        setCurrentorders(newCurrentOrders)
    }

    function handleChangeExtraIngredient({newExtraIngredient, extraIngredientIndex, orderIndex }) {

        const newCurrentOrders = JSON.parse(JSON.stringify(currentOrders))

        const { quantity } = newCurrentOrders.itemsxOrder[orderIndex].extraIngredients[extraIngredientIndex]
        const newExtraIngredientObject = {
            name: newExtraIngredient,
            costPerUnit: newExtraIngredient ? extraIngredients[newExtraIngredient].totalPrice : '0',
            quantity,
            cost: newExtraIngredient ? String(quantity * Number(extraIngredients[newExtraIngredient].totalPrice)) : '0'
        }

        newCurrentOrders.itemsxOrder[orderIndex].extraIngredients[extraIngredientIndex] = newExtraIngredientObject

        setCurrentorders(newCurrentOrders)
    }

    function handleChangeQuantityExtraIngredient({ newQuantity, extraIngredientIndex, orderIndex }) {
        if (Number.isNaN(Number(newQuantity)) || Number(newQuantity) < 0) return
        const newCurrentOrders = JSON.parse(JSON.stringify(currentOrders))
        
        const lastExtraIngredientObject = newCurrentOrders.itemsxOrder[orderIndex].extraIngredients[extraIngredientIndex]
        const newExtraIngredientObject = {
            ...lastExtraIngredientObject,
            quantity: newQuantity,
            cost: String(newQuantity * Number(lastExtraIngredientObject.costPerUnit))
        }

        newCurrentOrders.itemsxOrder[orderIndex].extraIngredients[extraIngredientIndex] = newExtraIngredientObject

        setCurrentorders(newCurrentOrders)
    }

    function handleChangePizza({newPizza, orderIndex }) {

        if (newPizza === null) return

        const newCurrentOrders = JSON.parse(JSON.stringify(currentOrders))
        
        const { masaType, quantityPizza, size } = newCurrentOrders.itemsxOrder[orderIndex].pizza

        const newPizzaObject = products.find(p => p.name === newPizza)

        const newSize = newPizzaObject.price[size] ? size : Object.keys(newPizzaObject.price)[0]
        const newMass = newPizzaObject.price[newSize][masaType] ? masaType : Object.keys(newPizzaObject.price[newSize])[0]

        newCurrentOrders.itemsxOrder[orderIndex].pizza = {
            name: newPizza,
            quantityPizza,
            size: newSize,
            masaType: newMass,
            cost: newPizzaObject.price[newSize][newMass]
        }

        newCurrentOrders.itemsxOrder[orderIndex].ingredientsOut = [null]

        setCurrentorders(newCurrentOrders)
    }

    function handleChangeSize({newSize, orderIndex}) {

        if (newSize === null) return

        const newCurrentOrders = JSON.parse(JSON.stringify(currentOrders))
        const lastPizza = newCurrentOrders.itemsxOrder[orderIndex].pizza
        const newPizzaObject = products.find(p => p.name === lastPizza.name)
        const newMass = newPizzaObject.price[newSize][lastPizza.masaType] ? newPizzaObject.price[newSize][lastPizza.masaType] : Object.keys(newPizzaObject.price[newSize])[0]

        newCurrentOrders.itemsxOrder[orderIndex].pizza = {
            ...lastPizza,
            size: newSize,
            masaType: newMass,
            cost: newPizzaObject.price[newSize][newMass]
        }

        setCurrentorders(newCurrentOrders)
    }

    function handleChangeMass({ newMass, orderIndex }) {
        
        if (newMass === null) return

        const newCurrentOrders = JSON.parse(JSON.stringify(currentOrders))
        const lastPizza = newCurrentOrders.itemsxOrder[orderIndex].pizza
        const newPizzaObject = products.find(p => p.name === lastPizza.name)
        newCurrentOrders.itemsxOrder[orderIndex].pizza = {
            ...lastPizza,
            masaType: newMass,
            cost: newPizzaObject.price[lastPizza.size][newMass]
        }

        setCurrentorders(newCurrentOrders)
    }

    function addItemToExtraIngredients({ orderIndex }) {

        const newCurrentOrders = JSON.parse(JSON.stringify(currentOrders))
        const currentListExtas = newCurrentOrders.itemsxOrder[orderIndex].extraIngredients
        const extraNameToAdd = extraIngredientsList.find(extra => !currentListExtas.map(e => e.name).includes(extra))

        if (!extraNameToAdd) return

        newCurrentOrders.itemsxOrder[orderIndex].extraIngredients.push({
            name: extraNameToAdd,
            quantity: 1,
            costPerUnit: extraIngredients[extraNameToAdd].totalPrice,
            cost: extraIngredients[extraNameToAdd].totalPrice
        })
        setCurrentorders(newCurrentOrders)
    }

    function addItemToIngredientsOut({ orderIndex }) {

        const newCurrentOrders = JSON.parse(JSON.stringify(currentOrders))

        const currentListIngredientsOut = newCurrentOrders.itemsxOrder[orderIndex].ingredientsOut
        const pizza = products.find(pizza => pizza.name === newCurrentOrders.itemsxOrder[orderIndex].pizza.name)
        const ingredientToAdd = pizza.ingredients.find(ingredient => !currentListIngredientsOut.includes(ingredient))

        if (!ingredientToAdd) return

        newCurrentOrders.itemsxOrder[orderIndex].ingredientsOut.push(ingredientToAdd)
        setCurrentorders(newCurrentOrders)
    }

    return (
        <Grid
            sx={{
                width: '100%'
            }}
        >
            {
                currentOrders.itemsxOrder && (
                    <>
                        {
                            currentOrders.itemsxOrder.map((order, orderIndex) => (
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
                                                                        <Typography>${Number(order.pizza.cost) + order.extraIngredients.reduce((acc, cur) => acc + Number(cur.cost) , 0)}</Typography>
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
                                                                    <Typography>${order.quantity * (Number(order.pizza.cost) + order.extraIngredients.reduce((acc, cur) => acc + Number(cur.cost) , 0))}</Typography>
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
                                                            onClick={() => {removeItemToCurrentListItems(orderIndex)}}
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