
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
                            currentOrders.itemsxOrder.map((order, index) => (
                                <Grid container key={order.id}>
                                    <Grid
                                        item
                                        xs
                                        key={order.id}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <Box sx={{ width: '100%', position: 'relative' }}>
                                            <List key={order.id}>
                                                <ListItem
                                                    sx={{
                                                        px: '0px',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <ListItemText
                                                        onClick={() => {
                                                            handleChangeCollapse(index)
                                                        }}
                                                        primary={
                                                        <Box
                                                            component={'div'}
                                                            sx={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between'
                                                            }}
                                                        >
                                                            <Typography>
                                                                {descriptionWithoutIngredientsOut(order.description)}
                                                            </Typography>
                                                            <Typography>
                                                                ${order.totalCostByItem}
                                                            </Typography>
                                                        </Box>
                                                        }
                                                    />
                                                </ListItem>
                                                <Divider />
                                            </List>
                                            <Collapse in={openCollapse[index]} timeout={'auto'} unmountOnExit >
                                                <List>
                                                    <ListItemText
                                                        primary={
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    // gap: '8px'
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
                                                                                {'1 ' + subElements[index].genericPizza.slice(1)}
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
                                                                    order.extraIngredients.map(extraIngredient => (
                                                                        <Box
                                                                            key={extraIngredient.name}
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
                                                                                            width: '80%',
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
                                                                    order.ingredientsOut.map(ingredient => (
                                                                        <Box
                                                                            key={ingredient}
                                                                            component={'div'}
                                                                            sx={{
                                                                                display: 'flex',
                                                                                justifyContent: 'space-between'
                                                                            }}
                                                                        >
                                                                            {
                                                                                editing ? (
                                                                                    <Autocomplete
                                                                                        value={ingredient}
                                                                                        options={products.find(pizza => pizza.name === order.pizza.name).ingredients}
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
                                            {
                                                editing && index > 0 ? (
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
                                                            onClick={() => {removeItemToCurrentListItems(index)}}
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