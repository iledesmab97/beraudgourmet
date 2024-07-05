import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'

import { useState } from 'react'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'
import useGetProducts from '@/hooks/useGetProducts'

import { updatePizza } from '@/services/productApi'
import { isSameArray } from '@/utils/preparingData'

function validation(listIngredients) {
    const errors = []
    listIngredients.forEach((ingredient, index) => {
        if (!ingredient) errors.push(index)
    })
    return errors
}

function errorStyles(error) {
    if (!error) return {}
    return {
        bgcolor: '#d32f2f',
        color:'#FFFDFF'
    }
}

function ListSaladIngredients({ ingredients, id, allIngredients, handleChangeInput, property, pizzaNew, errorsIngredients, handleInputsChecked, ...props }) {

    const [ingredientsList, setIngredientsList] = useState(ingredients)
    const [currentIngredientList, setCurrentIngredientList] = useState(ingredientsList)
    const [edit, setEdit] = useState(pizzaNew || false)
    const { handleUpdateAlertMessage } = useGetAlertMessage()
    const { handleUpdateProduct } = useGetProducts({type:'pizzas'})
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])

    function handleChange(event) {
        const {name, value} = event.target
        const newCurrentIngredientList = [...currentIngredientList]
        newCurrentIngredientList[name] = value
        setCurrentIngredientList(newCurrentIngredientList)
        setErrors([])
    }

    function removeIngredient(index) {
        const newCurrentIngredientList = [...currentIngredientList].filter((ingredient, i) => i !== index)
        setCurrentIngredientList(newCurrentIngredientList)
    }

    async function handleEdit() {
        if (!edit) return setEdit(prevState => !prevState)
        setLoading(true)
        console.log('validando datos...')
        const newErrors = validation(currentIngredientList)
        if (newErrors.length) {
            console.log('Error en la validación de datos')
            setErrors(newErrors)
            return setLoading(false)    
        }
        if (!isSameArray(currentIngredientList, ingredientsList) && !currentIngredientList.includes('')) {
            if (!pizzaNew) await saveIngredients()    
            handleChangeInput({value: currentIngredientList, property})
            handleInputsChecked(property, true)
        }
        setLoading(false)
        setEdit(prevState => !prevState)
    }

    function addIngredient() {
        const newCurrentIngredientList = [...currentIngredientList]
        newCurrentIngredientList.push('')
        setCurrentIngredientList(newCurrentIngredientList)
    }

    async function saveIngredients() {
        console.log('Guardando información...')  
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
            setIngredientsList(currentIngredientList)
            handleUpdateProduct({
                type: 'pizzas',
                id: id,
                property: 'ingredients',
                value: currentIngredientList
            })
            console.log('Datos guardados exitosamente')
        }
    }

    return (
        <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
                position: 'relative'
            }}
        >
            <Typography variant='title' >Ingredientes de la Pizza</Typography>
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
                                    key={`currentIngredientList:${currentIngredient}(${index})`}
                                >
                                    <ListItemText
                                        primary={
                                            <>
                                                <InputLabel>{`Nº ${index+1}`}</InputLabel>
                                                <Box
                                                    sx={{
                                                        width: 'fit-content',
                                                        position: 'relative'
                                                    }}
                                                >
                                                    <FormControl error={errors.includes(index)}>
                                                        <Select
                                                            disabled={!edit}
                                                            name={String(index)}
                                                            value={currentIngredient}
                                                            onChange={handleChange}
                                                            displayEmpty={true}
                                                            renderValue={ function(value) {
                                                                if (!value) return 'Agregar...'
                                                                return value
                                                            }}
                                                            {...props}
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
                                                            errors.includes(index) ? <FormHelperText>Agrega un ingrediente</FormHelperText> : null
                                                        }
                                                    </FormControl>
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
            <IconButton
                sx={ errorsIngredients ? {
                    ...errorStyles(errorsIngredients),
                    position: 'absolute',
                    bottom: '0px',
                    left: '100%'
                } : {
                    position: 'absolute',
                    bottom: '0px',
                    right: '0px'
                }}
                onClick={handleEdit}
                disabled={loading}
            >
                {
                    edit ? (
                        <CheckIcon />
                    ) : (
                        <EditIcon />
                    )
                }
            </IconButton>
        </Grid>
    )
}

export default ListSaladIngredients