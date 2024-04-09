import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Input from '@mui/material/Input'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import Collapse from '@mui/material/Collapse'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

import { useState, useEffect, useRef } from 'react'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'

import { getAllMasses, getAllSizes, addNewSize, deleteSize } from '@/services/pizzaCharacteristicsApi'

function PizzaCharacteristics({ sizes }) {

    const [currentSizesList, setCurrentSizesList] = useState(Object.entries(sizes))
    const [openColapse, setOpenColapse] = useState(false)
    const [edit, setEdit] = useState(false)
    const [massesList, setMassesList] = useState([])
    const [sizesList, setSizesList] = useState([])
    const [input, setInput] = useState('')
    const { handleUpdateAlertMessage } = useGetAlertMessage()
    const selectSize = useRef()

    useEffect(() => {
        getMassesList()
        getSizesList()
    }, [])

    async function getMassesList() {
        const response = await getAllMasses()
        setMassesList(response.map(mass => mass.name))
    }

    async function getSizesList() {
        const response = await getAllSizes()
        setSizesList(response.map(size => size.size))
    }

    function handleOpenColapse() {
        setOpenColapse(prevState => !prevState)
    }

    function handleEdit() {
        setEdit(prevState => !prevState)
    }

    async function addSize(indexSize) {
        const response = await addNewSize(input)
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
        const newSizesList = [...sizesList]
        newSizesList.push(input)
        setSizesList(newSizesList)
        handleChangeSize(input, indexSize)
        // if (!response.message) {
        //     handleUpdateProduct({
        //         type: 'pizzas',
        //         id: id,
        //         property: 'ingredients',
        //         value: currentIngredientList
        //     })
        // }
    }

    async function addNewPizzaMass(index) {
        const newCurrentSizesList = [...currentSizesList]
        newCurrentSizesList[index] = [newCurrentSizesList[index][0], {
            ...newCurrentSizesList[index][1],
            'Nueva Masa': ''
        }]
        setCurrentSizesList(newCurrentSizesList)
        // const response = await getAllMasses()
        // console.log('response:', response)
    }

    function handleChangeMass(event, indexSize, indexMass) {
        const mass = event.target.value
        const newCurrentSizesList = [...currentSizesList]
        const newMass = { [mass]: Object.values(newCurrentSizesList[indexSize][1])[indexMass]}
        newCurrentSizesList[indexSize][1] = newMass
        setCurrentSizesList(newCurrentSizesList)
    }

    function handleChangeSize(size, indexSize) {
        const newCurrentSizesList = [...currentSizesList]
        const newSize = [ size, newCurrentSizesList[indexSize][1]]
        newCurrentSizesList[indexSize] = newSize
        setCurrentSizesList(newCurrentSizesList)
    }

    function handleChangeInput(event) {
        setInput(event.target.value)
    }

    async function removeSize(size, indexSize) {
        const response = await deleteSize(size)
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

        handleChangeSize(Object.entries(sizes)[indexSize][0], indexSize)
        
        const newSizesList = [...sizesList].filter(sizeOfList => sizeOfList !== size)
        setSizesList(newSizesList)
    }

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                pb: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
            }}
        >
            <Typography variant='title' sx={{ alignSelf: 'center' }}>
                Tamaños y Masas Disponibles
            </Typography>
            {
                sizesList.length && massesList.length ? (
                    <List
                        sx={{
                            width: '100%'
                        }}
                    >
                        {
                            currentSizesList.map(([size, masses], indexSize) => (
                                <ListItem
                                    key={`availableSize(${size})`}
                                    sx={{
                                        width: '100%'
                                    }}
                                >
                                    <Grid
                                        container
                                        spacing={1}
                                        alignItems={'baseline'}
                                    >
                                        <Grid
                                            item xs={4}
                                            container
                                            justifyContent={'flex-end'}
                                        >
                                            {
                                                edit ? (
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <IconButton
                                                            onClick={() => {removeSize(size, indexSize)}}
                                                        >
                                                            <DeleteForeverIcon />
                                                        </IconButton>
                                                    </Box>
                                                ) : null
                                            }
                                            <FormControl>
                                                <Select
                                                    disabled={!edit}
                                                    value={size}
                                                    // variant="standard"
                                                    onChange={(event) => {handleChangeSize(event.target.value, indexSize)}}
                                                    ref={selectSize}
                                                >
                                                    {
                                                        sizesList.map(size => (
                                                            <MenuItem key={`allSizes(${size})`} value={size}>{size}</MenuItem>
                                                        ))
                                                    }
                                                    <MenuItem value={'Nuevo Tamaño'}>Nuevo Tamaño</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <IconButton
                                                    onClick={handleOpenColapse}
                                                >
                                                    {openColapse ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
                                                </IconButton>
                                            </Box>
                                            {
                                                edit && size === 'Nuevo Tamaño' ? (
                                                    <TextField
                                                        size='small'
                                                        variant="standard"
                                                        value={input}
                                                        onChange={handleChangeInput}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <IconButton
                                                                    onClick={() => {addSize(indexSize)}}
                                                                >
                                                                    <CheckIcon />
                                                                </IconButton>
                                                            )
                                                        }}
                                                    />
                                                ) : null
                                            }
                                        </Grid>
                                        <Grid
                                            item
                                            xs={8}
                                        >
                                        {
                                                Object.entries(masses).map(([mass, cost], indexMass) => (
                                                    <Collapse
                                                        key={`massesAvailable(${mass})`}
                                                        in={openColapse}
                                                        timeout={'auto'}
                                                        orientation='horizontal'
                                                    >
                                                        <Box
                                                            sx={{
                                                                width: '400px',
                                                                display: 'flex',
                                                                alignItems: 'baseline',
                                                                justifyContent: 'space-around'
                                                            }}
                                                        >
                                                            <Box>
                                                                <FormControl>
                                                                    <Select
                                                                        variant="standard"
                                                                        label='Ingredientes'
                                                                        value={mass}
                                                                        disabled={!edit}
                                                                        onChange={(event) => {handleChangeMass(event, indexSize, indexMass)}}
                                                                    >
                                                                        {
                                                                            massesList.map(m => (
                                                                                <MenuItem key={m} value={m}>{m}</MenuItem>
                                                                            ))
                                                                        }
                                                                        <MenuItem value='Nueva Masa'>Nueva Masa</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                                {
                                                                    edit ? (
                                                                        <Box>
                                                                            <IconButton
                                                                                onClick={() => {addNewPizzaMass(index)}}
                                                                            >
                                                                                <AddCircleOutlineIcon />
                                                                            </IconButton>
                                                                        </Box>
                                                                    ) : null
                                                                }
                                                            </Box>
                                                            <Box>
                                                                <TextField
                                                                    variant="standard"
                                                                    value={cost}
                                                                    disabled={!edit}
                                                                />
                                                            </Box>
                                                        </Box>
                                                    </Collapse>
                                                ))
                                            }
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                // <Box
                                //     key={size}
                                //     sx={{
                                //         display: 'flex',
                                //         alignSelf: 'flex-start',
                                //         justifyContent: 'flex-start',
                                //         alignItems: 'baseline'
                                //     }}
                                // >
                                
                                // </Box>
                            ))
                        }
                    </List>
                ) : null
            }
            {
                edit ? (
                    <Box>
                        <IconButton
                            // onClick={addNewPizzaSize}
                        >
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Box>
                ) : null
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
        </Box>
    )
}

export default PizzaCharacteristics