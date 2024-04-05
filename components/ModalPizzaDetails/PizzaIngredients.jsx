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
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { useState, useEffect } from 'react'

import { getAllIngredients } from '@/services/productApi'

function PizzaIngredients({ ingredients }) {

    const [currentIngredientList, setCurrentIngredientList] = useState(ingredients)
    const [edit, setEdit] = useState(false)
    const [allIngredients, setAllIngredients] = useState([])
    
    function handleChange(event) {
        const {name, value} = event.target
        const newCurrentIngredientList = [...currentIngredientList]
        newCurrentIngredientList[name] = value
        setCurrentIngredientList(newCurrentIngredientList)
    }

    function handleEdit() {
        setEdit(prevState => !prevState)
    }

    useEffect(() => {
        getAllIngredients().then(totalListIngredients => setAllIngredients(totalListIngredients.map(ingredient => ingredient.name)))
    }, [])

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
                            width: '50%',
                            position: 'relative'
                        }}
                    >
                        {
                            currentIngredientList.map((ingredient, index) => (
                                <ListItem key={`currentIngredientList:${ingredient}`}>
                                    <ListItemText
                                        primary={
                                            <>
                                                <InputLabel>{`Ingrediente ${index+1}`}</InputLabel>
                                                <Select
                                                    disabled={!edit}
                                                    name={String(index)}
                                                    label={`Ingrediente ${index+1}`}
                                                    value={ingredient}
                                                    onChange={handleChange}
                                                >
                                                    {
                                                        allIngredients.map(ingredient => (
                                                            <MenuItem key={`allIngredients:${ingredient}`} value={ingredient} >{ingredient}</MenuItem>
                                                        ))
                                                    }
                                                </Select>
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
                                right: '0px'
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
        </Box>
    )
}

export default PizzaIngredients