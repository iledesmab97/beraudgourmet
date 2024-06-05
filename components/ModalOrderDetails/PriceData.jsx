
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
                pizza
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
    // const [sizesList, setSizesList] = useState([])
    // const [massList, setMassList] = useState([])
    const [extraIngredientsList, setExtraIngredientsList] = useState([])
    // const [ingredientsList, setIngredientsList] = useState([])

    useEffect(() => {
        console.log('currentOrders:', currentOrders)
    }, [currentOrders])

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
        console.log('añadiendo elemento a la lista')
    }

    function handleChangeCount() {
        console.log('modificando la cantidad')
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
            costPerUnit: extraIngredients[newExtraIngredient].totalPrice,
            quantity,
            cost: String(quantity * Number(extraIngredients[newExtraIngredient].totalPrice))
        }

        newCurrentOrders.itemsxOrder[orderIndex].extraIngredients[extraIngredientIndex] = newExtraIngredientObject

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
                                                                                <TextField
                                                                                    value={'1'}
                                                                                    onChange={handleChangeCount}
                                                                                    variant='standard'
                                                                                    sx={{
                                                                                        width: '24px',
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
                                                                                    value={order.pizza.name}
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
                                                                        ${order.costPerUnity - order.extraIngredients.reduce((acc, cur) => acc + Number(cur.cost) , 0)}
                                                                    </Typography>
                                                                </Box>
                                                                {
                                                                    order.extraIngredients.map((extraIngredient, extraIngredientIndex) => (
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
                                                                                            variant='standard'
                                                                                            sx={{
                                                                                                width: '24px',
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
                                                                                            value={extraIngredient.name}
                                                                                            onChange={(event, newExtraIngredient) => { handleChangeExtraIngredient({newExtraIngredient, extraIngredientIndex, orderIndex}) }}
                                                                                            options={extraIngredientsList}
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