
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
import { changeOrderItems, getAllOrders, getItemsOrder } from '@/services/orderApi'

function preparingDataForDescription(order) {
    const extra = {}
    order.extraIngredients.forEach(extraIngredient => {
        extra[extraIngredient.name] = extraIngredient.quantity
    })
    return {
        quantity: order.quantity,
        name: order.item.name,
        size: order.item.size,
        mass: order.item.masaType,
        extra,
        ingredientsModal: order.ingredientsOut[0] ? order.ingredientsOut : []
    }
}

function PriceData({ order }) {

    const { products, totalProducts } = useGetProducts({type: 'pizzas'})
    const [ordersState, setOrdersState] = useState(JSON.parse(JSON.stringify(order)))
    const [currentOrders, setCurrentorders] = useState(() => {
        const { id, totalCost, totalCostByItems } = order
        return {
            id,
            itemsxOrder: [],
            totalCost,
            totalCostByItems
        }
    })
    const [subElements, setSubElements] = useState([])
    const [openCollapse, setOpenCollapse] = useState([])
    const [editing, setEditing] = useState(false)
    const { extraIngredients } = useGetExtraIngredients()
    const [pizzaList, setPizzaList] = useState([])
    const [saladList, setSaladList] = useState([])
    const [extraIngredientsList, setExtraIngredientsList] = useState([])
    const orderUpdated = useRef(null)
    const updateTotalSubElement = useRef(false)
    const { handleUpdateAlertMessage } = useGetAlertMessage()
    const { orderList, handleAddOrderList } = useGetOrderList()
    const [loading, setLoading] = useState(false)
    const [loadingItems, setLoadingItems] = useState(true)
    const [errorItems, setErrorItems] = useState('')

    // Buscar los items de la orde
    useEffect(() => {
        getItems()
    }, [])

    // Actualizar openCollapse
    useEffect(() => {
        if (subElements.length === openCollapse.length) return
        setOpenCollapse(() => subElements.map(() => false))
    }, [subElements])

    // Actualizar la información del estado subElements
    useEffect(() => {
        if (!updateTotalSubElement.current) return
        updateTotalSubElement.current = false
        const newSubElements = JSON.parse(JSON.stringify(subElements))
        subElements.forEach((item, index) => {
            const description = descriptionOrder(preparingDataForDescription(item), item.KindProduct)
            const { genericDataItem } = extractElements(description, item.KindProduct)
            const costPerUnity = String(Number(item.item.cost) + item.extraIngredients.reduce((acc, cur) => acc + Number(cur.cost), 0))
            const totalCostByItem = String(costPerUnity * item.quantity)
            newSubElements[index] = {
                ...newSubElements[index],
                description,
                genericDataItem,
                costPerUnity,
                totalCostByItem
            }
        })
        setSubElements(newSubElements)

    }, [subElements])

    // Actualizar los estados pizzaList y saladList
    useEffect(() => {
        if (!totalProducts) return
        if (totalProducts.pizzas) {
            setPizzaList(totalProducts.pizzas.map(pizza => pizza.name))
        }
        if (totalProducts.salads) {
            setSaladList(totalProducts.salads.map(salad => salad.name))
        }
    }, [totalProducts])

    useEffect(() => {
        if (!Object.keys(extraIngredients).length) return
        const newExtraIngredientsList = []
        for (let extraIngredient in extraIngredients) {
            newExtraIngredientsList.push(extraIngredient)
        }
        setExtraIngredientsList(newExtraIngredientsList)
    }, [extraIngredients])

    // Actualizar currentOrders
    useEffect(() => {
        if (!orderUpdated.current) return
        const { orderIndex, property } = orderUpdated.current
        const { id } = currentOrders
        const newItemsxOrders = JSON.parse(JSON.stringify(subElements))
        if (property !== 'removeOrder') {
            let { costPerUnity, totalCostByItem, quantity, KindProduct } = newItemsxOrders[orderIndex]
            if (['extraIngredients', 'item'].includes(property)) {
                costPerUnity = Number(newItemsxOrders[orderIndex].item.cost) + newItemsxOrders[orderIndex].extraIngredients.reduce((acc, cur) => acc + Number(cur.cost), 0)
                totalCostByItem = costPerUnity * quantity
            }
            const description = descriptionOrder(preparingDataForDescription(newItemsxOrders[orderIndex]), KindProduct)
            const { genericDataItem } = extractElements(description, KindProduct)
            newItemsxOrders[orderIndex] = {
                ...newItemsxOrders[orderIndex],
                description,
                costPerUnity: String(costPerUnity),
                totalCostByItem: String(totalCostByItem),
                genericDataItem
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

    async function getItems() {
        const itemsxOrder = await getItemsOrder(currentOrders.id)
        if (itemsxOrder.message) setErrorItems(itemsxOrder.message)
        else {
            const newItemsxOrder = itemsxOrder.map(currentItem => {
                const { KindProductId } = currentItem
                const dataExtractOfDescription = extractElements(currentItem.description, KindProductId)
                const { ingredientsOut, item, genericDataItem } = dataExtractOfDescription
                const extraIngredientsFromDescription = dataExtractOfDescription.extraIngredients
                const { size, masaType, name } = item
                const productFinded = totalProducts[KindProductId === 1 ? 'pizzas' : 'salads'].find(p => p.name === name)
                let cost
                switch (KindProductId) {
                    case 1: {
                        cost = productFinded ? productFinded.price[size][masaType] : '0'
                        break
                    }
                    case 2: {
                        cost = productFinded ? productFinded.totalPriceByUnity : '0'
                        break
                    }
                }
                const extraIngredientsData = extraIngredientsFromDescription.map(extra => extraIngredients[extra.name])
                return {
                    ...currentItem,
                    ingredientsOut,
                    extraIngredients: extraIngredientsFromDescription.map((extra, index) => ({
                        ...extra,
                        costPerUnit: extraIngredientsData[index].totalPrice,
                        cost: String(extraIngredientsData[index].totalPrice * extra.quantity)
                    })),
                    item: {
                        // ...currentItem,
                        ...item,
                        cost
                    },
                    genericDataItem
                }
            })
            const newCurrentOrder = {
                ...currentOrders,
                itemsxOrder: newItemsxOrder
            }
            setCurrentorders(newCurrentOrder)
            setSubElements(newItemsxOrder)
        }
        setLoadingItems(false)
    }

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
            item: {
                name: newPizza.name,
                size,
                masaType: mass,
                quantityItem: '1',
                cost: newPizza.price[size][mass],
            },
            extraIngredients: [],
            ingredientsOut: [],
            quantity: 1,
            costPerUnity: newPizza.price[size][mass],
            totalCostByItem: newPizza.price[size][mass],
            KindProduct: 'pizza'
        })

        const description = descriptionOrder(preparingDataForDescription(newSubElements[newSubElements.length - 1]), 'pizza')

        newSubElements[newSubElements.length - 1].description = description
        newSubElements[newSubElements.length - 1].genericDataItem = extractElements(description, 'pizza').genericDataItem

        orderUpdated.current = {orderIndex: newSubElements.length -1, property: 'removeOrder'}
        setSubElements(newSubElements)
    }

    function handleChangeQuantityPizza({newQuantity, orderIndex}) {

        if (Number.isNaN(Number(newQuantity)) || Number(newQuantity) < 0) return
        const newSubElements = JSON.parse(JSON.stringify(subElements))

        newSubElements[orderIndex].quantity = newQuantity

        updateTotalSubElement.current = true
        orderUpdated.current = {orderIndex, property: 'item'}
        setSubElements(newSubElements)
    }

    function removeIngredientOut({orderIndex, ingredientIndex}) {
        const newSubElements = JSON.parse(JSON.stringify(subElements))
        newSubElements[orderIndex].ingredientsOut = newSubElements[orderIndex].ingredientsOut.filter((ingredientOut, index) => index !== ingredientIndex)

        updateTotalSubElement.current = true
        orderUpdated.current = {orderIndex, property: 'ingredientsOut'}
        setSubElements(newSubElements)
    }

    function handleChangeIngredientOut({ orderIndex, ingredientIndex, newIngredientOut }) {

        if (newIngredientOut === null) return

        const newSubElements = JSON.parse(JSON.stringify(subElements))
        newSubElements[orderIndex].ingredientsOut[ingredientIndex] = newIngredientOut

        updateTotalSubElement.current = true
        orderUpdated.current = {orderIndex, property: 'ingredientsOut'}
        setSubElements(newSubElements)
    }

    function removeExtraIngredient({extraIngredientIndex, orderIndex}) {
        const newSubElements = JSON.parse(JSON.stringify(subElements))
        newSubElements[orderIndex].extraIngredients = newSubElements[orderIndex].extraIngredients.filter((extra, index) => index !== extraIngredientIndex)

        updateTotalSubElement.current = true
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

        updateTotalSubElement.current = true
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

        updateTotalSubElement.current = true
        orderUpdated.current = {orderIndex, property: 'extraIngredients'}
        setSubElements(newSubElements)
    }

    function handleChangeItem({newItem, orderIndex }) {

        const newSubElements = JSON.parse(JSON.stringify(subElements))
        const { KindProduct } = newSubElements[orderIndex]

        switch (KindProduct) {
            case 'pizza': {
                if (newItem === null) return

                const { masaType, quantityItem, size } = newSubElements[orderIndex].item

                const newPizzaObject = products.find(p => p.name === newItem)

                const newSize = newPizzaObject.price[size] ? size : Object.keys(newPizzaObject.price)[0]
                const newMass = newPizzaObject.price[newSize][masaType] ? masaType : Object.keys(newPizzaObject.price[newSize])[0]

                newSubElements[orderIndex].item = {
                    name: newItem,
                    quantityItem,
                    size: newSize,
                    masaType: newMass,
                    cost: newPizzaObject.price[newSize][newMass]
                }

                break
            }
            case 'salad': {

                const { quantityItem } = newSubElements[orderIndex].item

                const newSaladObject = totalProducts['salads'].find(s => s.name === newItem)

                newSubElements[orderIndex].item = {
                    name: newItem,
                    quantityItem,
                    cost: newSaladObject.totalPriceByUnity,
                }

                break
            }
        }

        newSubElements[orderIndex].ingredientsOut = []
        orderUpdated.current = {orderIndex, property: 'item'}
        updateTotalSubElement.current = true
        setSubElements(newSubElements)
    }

    function handleChangeSize({newSize, orderIndex}) {

        if (newSize === null) return

        const newSubElements = JSON.parse(JSON.stringify(subElements))
        const lastItem = newSubElements[orderIndex].item
        const newPizzaObject = products.find(p => p.name === lastItem.name)
        const newMass = newPizzaObject.price[newSize][lastItem.masaType] ? newPizzaObject.price[newSize][lastItem.masaType] : Object.keys(newPizzaObject.price[newSize])[0]

        newSubElements[orderIndex].item = {
            ...lastItem,
            size: newSize,
            masaType: newMass,
            cost: newPizzaObject.price[newSize][newMass]
        }

        updateTotalSubElement.current = true
        orderUpdated.current = {orderIndex, property: 'item'}

        setSubElements(newSubElements)
    }

    function handleChangeMass({ newMass, orderIndex }) {

        if (newMass === null) return

        const newSubElements = JSON.parse(JSON.stringify(subElements))
        const lastItem = newSubElements[orderIndex].item
        const newPizzaObject = products.find(p => p.name === lastItem.name)
        newSubElements[orderIndex].item = {
            ...lastItem,
            masaType: newMass,
            cost: newPizzaObject.price[lastItem.size][newMass],
        }

        updateTotalSubElement.current = true
        orderUpdated.current = {orderIndex, property: 'item'}

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

        updateTotalSubElement.current = true
        orderUpdated.current = {orderIndex, property: 'extraIngredients'}
        setSubElements(newSubElements)
    }

    function addItemToIngredientsOut({ orderIndex }) {

        const newSubElements = JSON.parse(JSON.stringify(subElements))

        const { KindProduct } = newSubElements[orderIndex]
        const currentListIngredientsOut = newSubElements[orderIndex].ingredientsOut
        const item = totalProducts[KindProduct + 's'].find(item => item.name === newSubElements[orderIndex].item.name)
        const ingredientToAdd = item.ingredients.find(ingredient => !currentListIngredientsOut.includes(ingredient))

        if (!ingredientToAdd) return

        newSubElements[orderIndex].ingredientsOut.push(ingredientToAdd)

        updateTotalSubElement.current = true
        orderUpdated.current = {orderIndex, property: 'ingredientsOut'}
        setSubElements(newSubElements)
    }

    async function updateDataOrder() {

        setLoading(true)
        const orderToCompare = JSON.parse(JSON.stringify({...ordersState}))
        const { id, itemsxOrder, totalCost, totalCostByItems } = orderToCompare
        const newItemsxOrder = itemsxOrder.map(order => {
            const { ingredientsOut, item, genericDataItem } = extractElements(order.description, order.KindProduct)
            return {
                ...order,
                ingredientsOut,
                item,
                genericDataItem
            }
        })
        
        const currentOrdersToCompare = JSON.parse(JSON.stringify({...currentOrders}))
        
        for ( let order of currentOrdersToCompare.itemsxOrder ) {
            delete order.item.cost
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
            text = 'Data updated successfully'
            status = 'success'
        }
        handleUpdateAlertMessage({
            checked: true,
            text,
            status
        })
        if (!response.message) {
            getAllOrders({ p: orderList.currentPage, items: orderList.itemsxPage}).then(data => {
                handleAddOrderList(data)                
            })
            const newOrder = {
                ...orderToCompare,
                ...currentOrdersToCompare
            }
            setOrdersState(response)
            setLoading(false)
            return 'Data updated successfully'
        }
        setLoading(false)
        return {message: response.message}
    }

    function findOptions(itemOrder, option, extraOption) {
        const { KindProductId } = itemOrder
        let optionList = []
        switch (KindProductId) {
            case 1: {
                const pizzaFinded = products.find(pizza => pizza.name === itemOrder.item.name)
                switch (option) {
                    case 'size': {
                        optionList = Object.keys(pizzaFinded.price)
                        break
                    }
                    case 'mass': {
                        optionList = Object.keys(pizzaFinded.price[extraOption])
                        break
                    }
                    case 'ingredientsOut': {
                        optionList = pizzaFinded.ingredients
                        break
                    }
                }
                break
            }
            case 2: {
                const saladFinded = totalProducts['salads'].find(salad => salad.name === itemOrder.item.name)
                optionList = saladFinded.ingredients
                break
            }
            default: {
                break
            }
        }
        return optionList
    }

    function findProductList(itemOrder) {
        const { KindProductId } = itemOrder
        switch (KindProductId) {
            case 1: {
                return pizzaList
            }
            case 2: {
                return saladList
            }
        }
    }

    return (
        <Grid
            sx={{
                width: '100%'
            }}
        >
            {
                loadingItems && <h1>Loading...</h1>
            }
            {
                errorItems && <h1>Error: {errorItems}</h1>
            }
            {
                (currentOrders.itemsxOrder.length && subElements.length) ? (
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
                                                                    extractElements(order.description, order.KindProduct).ingredientsOut.map((ingredient, index) => (
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
                                                                                    value={order.item.name}
                                                                                    onChange={(event, newItem) => { handleChangeItem({newItem, orderIndex }) }}
                                                                                    options={findProductList(order)}
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
                                                                                {
                                                                                    order.KindProductId === 1 ? (
                                                                                        <>
                                                                                            {'('}
                                                                                            <Autocomplete
                                                                                                value={order.item.size}
                                                                                                onChange={(event, newSize) => { handleChangeSize({newSize, orderIndex}) }}
                                                                                                options={findOptions(order, 'size')}
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
                                                                                                value={order.item.masaType}
                                                                                                onChange={(event, newMass) => { handleChangeMass({ newMass, orderIndex }) }}
                                                                                                options={findOptions(order, 'mass', order.item.size)}
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
                                                                                        </>
                                                                                    ) : null
                                                                                }
                                                                            </Box>
                                                                        ) : (
                                                                            <Typography
                                                                                sx={{
                                                                                    fontSize: '0.875rem',
                                                                                    color: 'rgba(0, 0, 0, 0.6)'
                                                                                }}
                                                                            >
                                                                                {'1 ' + subElements[orderIndex].genericDataItem.slice(1)}
                                                                            </Typography>       
                                                                        )
                                                                    }
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: '0.875rem',
                                                                            color: 'rgba(0, 0, 0, 0.6)'
                                                                        }}
                                                                    >
                                                                        ${order.item.cost}
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
                                                                                editing ? (null
                                                                                    // <Box
                                                                                    //     sx={{
                                                                                    //         position: 'relative',
                                                                                    //         width: 'fit-content',
                                                                                    //         fontSize: '0.875rem',
                                                                                    //         color: 'rgba(0, 0, 0, 0.6)',
                                                                                    //         display: 'flex',
                                                                                    //         alignItems: 'center',
                                                                                    //         gap: '8px'
                                                                                    //     }}
                                                                                    // >
                                                                                    //     <TextField
                                                                                    //         value={`${extraIngredient.quantity}`}
                                                                                    //         onChange={(event) => {handleChangeQuantityExtraIngredient({ newQuantity: event.target.value, extraIngredientIndex, orderIndex })}}
                                                                                    //         variant='standard'
                                                                                    //         sx={{
                                                                                    //             width: '32px',
                                                                                    //         }}
                                                                                    //         inputProps={{
                                                                                    //             style: {
                                                                                    //                 fontSize: '0.875rem',
                                                                                    //                 textAlign: 'center',
                                                                                    //                 color: 'rgba(0, 0, 0, 0.6)'
                                                                                    //             }
                                                                                    //         }}
                                                                                    //     />
                                                                                    //     x
                                                                                    //     <Autocomplete
                                                                                    //         value={ extraIngredient.name }
                                                                                    //         onChange={(event, newExtraIngredient) => { handleChangeExtraIngredient({newExtraIngredient, extraIngredientIndex, orderIndex}) }}
                                                                                    //         options={extraIngredientsList}
                                                                                    //         getOptionDisabled={(option) => listExtraIngredients.map(extra => extra.name).includes(option)}
                                                                                    //         renderInput={(params) => {
                                                                                    //             return <TextField
                                                                                    //                 variant='standard'
                                                                                    //                 {...params}
                                                                                    //             />
                                                                                    //         }}
                                                                                    //         sx={{
                                                                                    //             width: '150px',
                                                                                    //             '& input': {
                                                                                    //                 fontSize: '0.875rem',
                                                                                    //                 color: 'rgba(0, 0, 0, 0.6)',
                                                                                    //                 // textAlign: 'center'
                                                                                    //             }
                                                                                    //         }}
                                                                                    //     />
                                                                                    //     <Typography>{`($${extraIngredient.costPerUnit} c/u)`}</Typography>
                                                                                    //     <Box
                                                                                    //         sx={{
                                                                                    //             transform: 'scale(0.8)'
                                                                                    //         }}
                                                                                    //     >
                                                                                    //         <IconButton
                                                                                    //             onClick={() => {removeExtraIngredient({extraIngredientIndex, orderIndex})}}
                                                                                    //             sx={{ p: '0px' }}
                                                                                    //         >
                                                                                    //             <CancelIcon
                                                                                    //                 sx={{
                                                                                    //                     color: '#f6685e'
                                                                                    //                 }} />
                                                                                    //         </IconButton>
                                                                                    //     </Box>
                                                                                    // </Box>
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
                                                                    editing ? (null
                                                                        // <Box>
                                                                        //     <IconButton
                                                                        //         onClick={() => {addItemToExtraIngredients({orderIndex})}}
                                                                        //     >
                                                                        //         <AddCircleOutlineIcon />
                                                                        //     </IconButton>
                                                                        // </Box>
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
                                                                                editing ? (null
                                                                                    // <>
                                                                                    //     <Autocomplete
                                                                                    //         value={ingredient}
                                                                                    //         onChange={( event, newIngredientOut ) => { handleChangeIngredientOut({ orderIndex, ingredientIndex, newIngredientOut }) } }
                                                                                    //         options={findOptions(order, 'ingredientsOut')}
                                                                                    //         getOptionDisabled={(option) => listIngredintsOut.includes(option)}
                                                                                    //         renderInput={(params) => {
                                                                                    //             return <TextField
                                                                                    //                 variant='standard'
                                                                                    //                 {...params}
                                                                                    //             />
                                                                                    //         }}
                                                                                    //         sx={{
                                                                                    //             width: '150px',
                                                                                    //             '& input': {
                                                                                    //                 fontSize: '0.875rem',
                                                                                    //                 color: 'rgba(0, 0, 0, 0.6)',
                                                                                    //                 textDecoration: 'line-through'
                                                                                    //                 // textAlign: 'center'
                                                                                    //             }
                                                                                    //         }}
                                                                                    //     />
                                                                                    //     <Box
                                                                                    //         sx={{
                                                                                    //             position: 'absolute',
                                                                                    //             top: '0px',
                                                                                    //             left: '100%',
                                                                                    //             transform: 'scale(0.8)'
                                                                                    //         }}
                                                                                    //     >
                                                                                    //         <IconButton
                                                                                    //             onClick={() => {removeIngredientOut({ingredientIndex, orderIndex})}}
                                                                                    //         >
                                                                                    //             <CancelIcon
                                                                                    //                 sx={{
                                                                                    //                     // scale: 2,
                                                                                    //                     color: '#f6685e'
                                                                                    //                 }} />
                                                                                    //         </IconButton>
                                                                                    //     </Box>
                                                                                    // </>
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
                                                                    editing ? (null
                                                                        // <Box>
                                                                        //     <IconButton
                                                                        //         onClick={() => {addItemToIngredientsOut({orderIndex})}}
                                                                        //     >
                                                                        //         <AddCircleOutlineIcon />
                                                                        //     </IconButton>
                                                                        // </Box>
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
                                                editing && subElements.length > 1 ? (
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
                ) : null
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