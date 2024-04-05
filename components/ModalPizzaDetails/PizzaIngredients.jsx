import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Input from '@mui/material/Input'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { useState, useEffect } from 'react'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'
import useGetProducts from '@/hooks/useGetProducts'

import { getAllIngredients, updatePizza } from '@/services/productApi'
import { isSameArray } from '@/utils/preparingData'

function PizzaIngredients({ ingredients, id }) {

    const [ingredientsList, setIngredientsList] = useState(ingredients)
    const [currentIngredientList, setCurrentIngredientList] = useState(ingredientsList)
    const [edit, setEdit] = useState(false)
    const [allIngredients, setAllIngredients] = useState([])
    const { handleUpdateAlertMessage } = useGetAlertMessage()
    const { handleUpdateProduct } = useGetProducts({type:'pizzas'})
    
    useEffect(() => {
        getAllIngredients()
            .then(totalListIngredients => setAllIngredients(totalListIngredients.map(ingredient => ingredient.name)))
    }, [])

    function handleChange(event) {
        const {name, value} = event.target
        const newCurrentIngredientList = [...currentIngredientList]
        newCurrentIngredientList[name] = value
        setCurrentIngredientList(newCurrentIngredientList)
    }

    async function handleEdit() {
        if (edit && !isSameArray(currentIngredientList, ingredientsList) && !currentIngredientList.includes('')) {
            await saveIngredients()
            setIngredientsList(currentIngredientList)
        }
        setEdit(prevState => !prevState)
    }

    function removeIngredient(index) {
        const newCurrentIngredientList = [...currentIngredientList].filter((ingredient, i) => i !== index)
        setCurrentIngredientList(newCurrentIngredientList)
    }

    async function saveIngredients() {
        const response = await updatePizza( id, {
            property: 'ingredients',
            value: currentIngredientList
        })
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
            handleUpdateProduct({
                type: 'pizzas',
                id: id,
                property: 'ingredients',
                value: currentIngredientList
            })
        }
    }

    function addIngredient() {
        const newCurrentIngredientList = [...currentIngredientList]
        newCurrentIngredientList.push('')
        setCurrentIngredientList(newCurrentIngredientList)
    }

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Typography variant='title' sx={{ alignSelf: 'center' }}>
                Ingredientes
            </Typography>
            {
                allIngredients.length ? (
                    <List
                        sx={{
                            width: 'fit-content',
                            position: 'relative'
                        }}
                    >
                        {
                            currentIngredientList.map((currentIngredient, index) => (
                                <ListItem
                                    key={`currentIngredientList:${currentIngredient}`}
                                >
                                    <ListItemText
                                        primary={
                                            <>
                                                {/* <InputLabel>{`Ingrediente ${index+1}`}</InputLabel> */}
                                                <Box
                                                    sx={{
                                                        width: 'fit-content',
                                                        position: 'relative'
                                                    }}
                                                >
                                                    <Select
                                                        disabled={!edit}
                                                        name={String(index)}
                                                        label={`Ingrediente ${index+1}`}
                                                        value={currentIngredient}
                                                        onChange={handleChange}
                                                        displayEmpty={true}
                                                        renderValue={ function(value) {
                                                            if (!value) return 'Agregar...'
                                                            return value
                                                        }}
                                                    >
                                                        {
                                                            allIngredients.map(ingredientOption => (
                                                                <MenuItem
                                                                    key={`allIngredients:${ingredientOption}`}
                                                                    value={ingredientOption}
                                                                    disabled={currentIngredientList.includes(ingredientOption)}
                                                                >
                                                                    {ingredientOption}
                                                                </MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                                    {
                                                        edit ? (
                                                            <IconButton
                                                                name={index}
                                                                sx={{
                                                                    position: 'absolute',
                                                                    top: '50%',
                                                                    left: '100%',
                                                                    transform: 'translateY(-50%)'
                                                                }}
                                                                onClick={() => {removeIngredient(index)}}
                                                            >
                                                                <DeleteForeverIcon />
                                                            </IconButton>
                                                        ) : null
                                                    }
                                                </Box>
                                            </>
                                        }
                                    />
                                </ListItem>
                            ))
                        }
                        <IconButton
                            sx={{
                                position: 'absolute',
                                bottom: '0px',
                                left: '100%'
                            }}
                            onClick={handleEdit}
                        >
                            {
                                edit ? (
                                    <CheckIcon />
                                ) : (
                                    <EditIcon />
                                )
                            }
                        </IconButton>
                    </List>
                ) : null
            }
            {
                edit ? (
                    <Box>
                        <IconButton
                            onClick={addIngredient}
                        >
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Box>
                ) : null
            }
        </Box>
    )
}

export default PizzaIngredients