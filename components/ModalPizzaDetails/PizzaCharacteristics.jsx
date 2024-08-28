import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

import CloseIcon from '@mui/icons-material/Close'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'

import { useState, useEffect, useRef } from 'react'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'
import useGetProducts from '@/hooks/useGetProducts'

import { getAllMasses, getAllSizes, addNewSize, deleteSize, addNewMass, deleteMass } from '@/services/pizzaCharacteristicsApi'
import { deepEqual } from '@/utils/preparingData'

function validation(input) {
    const error = {}
    if (!input) error.input = 'Este campo no puede estar vacio'
    return error
}

function totalValidation(sizesList) {
    const errors = {}
    for (let size in sizesList) {
        if (size === 'Nuevo Tamaño') errors[size] = 'Selecciona una opción válida'
        for (let mass in sizesList[size]) {
            if (!sizesList[size][mass]) {
                errors[`${size}x${mass}xcost`] = 'Agrega un valor'
            }
        }
    }
    return errors
}

function errorStyles(error) {
    if (!error) return {}
    return {
        bgcolor: '#d32f2f',
        color:'#FFFDFF'
    }
}

function PizzaCharacteristics({ pizza, updatePizzaProperty, handleChangeInput, pizzaNew, property, errors, pizzaId, handleInputsChecked }) {

    const [currentSizesList, setCurrentSizesList] = useState(Object.entries(pizza.price))
    const [arrayOpenColapse, setArrayOpencopase] = useState(currentSizesList.map(() => pizzaNew || false ))
    const [edit, setEdit] = useState(pizzaNew || false)
    const [massesList, setMassesList] = useState([])
    const [sizesList, setSizesList] = useState([])
    const [inputSize, setInputSize] = useState('')
    const [errorInputSize, setErrorInputSize] = useState({})
    const [inputMass, setInputMass] = useState('')
    const [errorInputMass, setErrorInputMass] = useState({})
    const [errorsCurrentSizesList, setErrorsCurrentSizesList] = useState({})
    const [loading, setLoading] = useState(false)
    const { handleUpdateAlertMessage } = useGetAlertMessage()
    const selectSize = useRef()

    useEffect(() => {
        async function getCharacteristics() {
            await getMassesList()
            await getSizesList()
        }
        getCharacteristics()
    }, [])

    async function getMassesList() {
        const response = await getAllMasses()
        setMassesList(response.map(mass => mass.name))
    }

    async function getSizesList() {
        const response = await getAllSizes()
        setSizesList(response.map(size => size.size))
    }

    function handleOpenColapse(indexSize) {
        const newArrayOpenCollapse = [...arrayOpenColapse]
        newArrayOpenCollapse[indexSize] = !newArrayOpenCollapse[indexSize]
        setArrayOpencopase(newArrayOpenCollapse)
    }

    async function handleEdit() {
        setLoading(true)
        if (edit) {
            console.log('validando datos...')
            const currentErrors = totalValidation(Object.fromEntries(currentSizesList))
            if (Object.keys(currentErrors).length) {
                setErrorsCurrentSizesList(currentErrors)
                return setLoading(false)
            }
            setErrorsCurrentSizesList(currentErrors)
            if (pizzaNew) {
                handleChangeInput({value: Object.fromEntries(currentSizesList), property})
                handleInputsChecked(property, true)
            } else {
                if (!deepEqual(pizza.price, Object.fromEntries(currentSizesList))) {
                    const listNewCharacteristicsOfPizza = []
                    const currentSizesListObject = Object.fromEntries(currentSizesList)
                    for (let size in currentSizesListObject) {
                        for (let mass in currentSizesListObject[size]) {
                            const cost = currentSizesListObject[size][mass]
                            listNewCharacteristicsOfPizza.push({
                                cost,
                                characteristics: {
                                    mass,
                                    size
                                }
                            })
                        }
                    }
                    console.log('Actualizando datos...')
                    updatePizzaProperty({
                        id: pizzaId,
                        property: 'characteristics',
                        value: listNewCharacteristicsOfPizza
                    })
                }
            }
        }
        setLoading(false)
        setEdit(prevState => !prevState)
    }

    async function addSize(indexSize) {
        const error = validation(inputSize)
        if (error.input) {
            return setErrorInputSize(error)
        }
        const response = await addNewSize(inputSize)
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
        newSizesList.push(inputSize)
        await setSizesList(newSizesList)
        handleChangeSize(inputSize, indexSize)
    }

    async function addMass(indexSize, indexMass) {
        const error = validation(inputMass)
        if (error.input) {
            return setErrorInputMass(error)
        }
        const response = await addNewMass(inputMass)
        let text, status
        if (response.message) {
            text = response.message
            status = 'error'
        } else {
            text = 'Mass created successfully'
            status = 'success'
        }
        handleUpdateAlertMessage({
            checked: true,
            text,
            status
        })
        const newMassesList = [...massesList]
        newMassesList.push(response.name)
        await setMassesList(newMassesList)
        handleChangeMass(inputMass, indexSize, indexMass)
    }

    async function addNewLineMass(indexSize) {
        const currentMassesToSize = Object.keys(currentSizesList[indexSize][1])
        let newMass = ''
        for (let mass of massesList) {
            if (!currentMassesToSize.includes(mass)) {
                newMass = mass
                break
            }
        }
        
        const newCurrentSizesList = [...currentSizesList]
        newCurrentSizesList[indexSize][1] = {
            ...newCurrentSizesList[indexSize][1],
            [newMass]: ''
        }

        // newCurrentSizesList[indexSize] = [newCurrentSizesList[index][0], {
        //     ...newCurrentSizesList[index][1],
        //     'Nueva Masa': ''
        // }]
        setCurrentSizesList(newCurrentSizesList)
        // const response = await getAllMasses()
    }

    async function addNewLineSize() {
        const currentSizes = currentSizesList.map(sizeArray => sizeArray[0])
        let newSize = ''
        for (let size of sizesList) {
            if (!currentSizes.includes(size)) {
                newSize = size
                break
            }
        }
        
        const mass = {
            [massesList[0]]: ''
        }
        const newCurrentSizesList = [...currentSizesList]
        newCurrentSizesList.push([newSize, mass])
        // newCurrentSizesList[indexSize][1] = {
        //     ...newCurrentSizesList[indexSize][1],
        //     [newMass]: ''
        // }

        // newCurrentSizesList[indexSize] = [newCurrentSizesList[index][0], {
        //     ...newCurrentSizesList[index][1],
        //     'Nueva Masa': ''
        // }]
        setCurrentSizesList(newCurrentSizesList)
        // const response = await getAllMasses()
    }

    async function closeLineMass(indexSize, mass) {
        const currentMassesOfSize = {
            ...currentSizesList[indexSize][1]
        }
        delete currentMassesOfSize[mass]

        const newCurrentSizesList = [...currentSizesList]
        newCurrentSizesList[indexSize][1] = currentMassesOfSize

        setCurrentSizesList(newCurrentSizesList)
    }

    async function closeLineSize(size) {
        const newCurrentSizesObject = Object.fromEntries([...currentSizesList])
        delete newCurrentSizesObject[size]

        const newCurrentSizesList = Object.entries(newCurrentSizesObject)

        setCurrentSizesList(newCurrentSizesList)
    }

    function handleChangeMass(mass, indexSize, indexMass) {
        const newCurrentSizesList = [...currentSizesList]
        const newMassesList = Object.entries(newCurrentSizesList[indexSize][1])
        newMassesList[indexMass] = [mass, newMassesList[indexMass][1]]
        const newMassesObject = Object.fromEntries(newMassesList)
        newCurrentSizesList[indexSize][1] = newMassesObject
        setCurrentSizesList(newCurrentSizesList)
    }

    function handleChangeSize(size, indexSize) {
        const newCurrentSizesList = [...currentSizesList]
        const newSize = [ size, newCurrentSizesList[indexSize][1]]
        newCurrentSizesList[indexSize] = newSize
        setCurrentSizesList(newCurrentSizesList)
    }

    function handleChangeInputSize(event) {
        setErrorInputSize({})
        setInputSize(event.target.value)
    }

    function handleChangeInputMass(event) {
        setErrorInputMass({})
        setInputMass(event.target.value)
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

        handleChangeSize(Object.entries(pizza.price)[indexSize][0], indexSize)
        
        const newSizesList = [...sizesList].filter(sizeOfList => sizeOfList !== size)
        setSizesList(newSizesList)
    }

    async function removeMass(mass, indexSize, indexMass) {
        const response = await deleteMass(mass)
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

        handleChangeMass(Object.keys(Object.entries(pizza.price)[indexSize][1])[indexMass], indexSize, indexMass)
        
        const newMassesList = [...massesList].filter(massOfList => massOfList !== mass)
        setMassesList(newMassesList)
    }

    function handleChangeCost(cost, indexSize, mass) {
        const newCurrentSizesList = [...currentSizesList]
        newCurrentSizesList[indexSize][1] = {
            ...newCurrentSizesList[indexSize][1],
            [mass]: cost
        }
        setCurrentSizesList(newCurrentSizesList)
        const currentErrors = totalValidation(Object.fromEntries(newCurrentSizesList))
        if (Object.keys(currentErrors).length) {
            setErrorsCurrentSizesList(currentErrors)
        }
    }

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
            }}
        >
            <Typography variant='title' sx={{ alignSelf: 'center' }}>
                Tamaños y Masas Disponibles
            </Typography>
            {
                sizesList.length && massesList.length ? (
                    <List
                        sx={{
                            width: '100%',

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
                                        alignItems='flex-start'
                                        wrap='nowrap'
                                        sx={{
                                            position: 'relative',
                                            boxSizing: 'content-box',
                                            height: '48px',
                                            overflowX: 'auto',
                                            overflowY: 'hidden',
                                            transition: 'height 0.3s'
                                        }}
                                        style={ arrayOpenColapse[indexSize] ? { height: 'auto'} : null}
                                    >
                                        <Grid
                                            item
                                            container
                                            direction='column'
                                            alignItems='center'
                                            sx={{
                                                width: 'fit-content'
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center'
                                                }}
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
                                                <FormControl error={Boolean(errorsCurrentSizesList[size])}>
                                                    <Select
                                                        disabled={!edit}
                                                        value={size}
                                                        onChange={(event) => {handleChangeSize(event.target.value, indexSize)}}
                                                        ref={selectSize}
                                                        size='small'
                                                    >
                                                        {
                                                            sizesList.map(size => (
                                                                <MenuItem key={`allSizes(${size})`} value={size}>{size}</MenuItem>
                                                            ))
                                                        }
                                                        <MenuItem value={'Nuevo Tamaño'}>Nuevo Tamaño</MenuItem>
                                                    </Select>
                                                    {
                                                        errorsCurrentSizesList[size] && <FormHelperText>{errorsCurrentSizesList[size]}</FormHelperText>
                                                    }
                                                </FormControl>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    <IconButton
                                                        onClick={() => {handleOpenColapse(indexSize)}}
                                                    >
                                                        {arrayOpenColapse[indexSize] ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                            {
                                                edit && size === 'Nuevo Tamaño' ? (
                                                    <TextField
                                                        size='small'
                                                        variant="standard"
                                                        value={inputSize}
                                                        onChange={handleChangeInputSize}
                                                        error={Boolean(errorInputSize.input)}
                                                        helperText={errorInputSize.input}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <IconButton
                                                                    onClick={() => {addSize(indexSize)}}
                                                                >
                                                                    <CheckIcon />
                                                                </IconButton>
                                                            )
                                                        }}
                                                        sx={{
                                                            width: '70%'
                                                        }}
                                                    />
                                                ) : null
                                            }
                                        </Grid>
                                        <Grid
                                            item
                                            sx={{
                                                width: 'fit-content'
                                            }}
                                        >
                                            <Collapse
                                                in={arrayOpenColapse[indexSize]}
                                                timeout={'auto'}
                                                orientation='horizontal'
                                                sx={{
                                                    position: 'relative'
                                                }}
                                            >
                                                {
                                                    Object.entries(masses).map(([mass, cost], indexMass) => (

                                                        <Box
                                                            key={`${mass}`}
                                                            sx={{
                                                                width: '400px',
                                                                position: 'relative',
                                                                display: 'flex',
                                                                alignItems: 'flex-start',
                                                                justifyContent: 'flex-end',
                                                                mb: '8px'
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    alignItems: 'flex-end',
                                                                    pr: '40px'
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex'
                                                                    }}
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
                                                                                    onClick={() => {removeMass(mass, indexSize, indexMass)}}
                                                                                >
                                                                                    <DeleteForeverIcon />
                                                                                </IconButton>
                                                                            </Box>
                                                                        ) : null
                                                                    }
                                                                    <FormControl error={Boolean(errorsCurrentSizesList[`${size}x${mass}`])}>
                                                                        <Select
                                                                            // variant="standard"
                                                                            // label='Ingredientes'
                                                                            value={mass}
                                                                            disabled={!edit}
                                                                            onChange={(event) => {handleChangeMass(event.target.value, indexSize, indexMass)}}
                                                                            size='small'
                                                                        >
                                                                            {
                                                                                massesList.map(m => (
                                                                                    <MenuItem
                                                                                        key={m}
                                                                                        value={m}
                                                                                        disabled={Object.keys(masses).includes(m)}
                                                                                    >
                                                                                        {m}
                                                                                    </MenuItem>
                                                                                ))
                                                                            }
                                                                            <MenuItem value='Nueva Masa'>Nueva Masa</MenuItem>
                                                                        </Select>
                                                                        {
                                                                            errorsCurrentSizesList[`${size}x${mass}`] && <FormHelperText>{errorsCurrentSizesList[`${size}x${mass}`]}</FormHelperText>
                                                                        }
                                                                    </FormControl>
                                                                </Box>
                                                                {
                                                                    edit && mass === 'Nueva Masa' ? (
                                                                        <Box
                                                                            sx={{
                                                                                display: 'flex',
                                                                                justifyContent: 'flex-end'
                                                                            }}
                                                                        >
                                                                            <TextField
                                                                                size='small'
                                                                                variant="standard"
                                                                                value={inputMass}
                                                                                onChange={handleChangeInputMass}
                                                                                error={Boolean(errorInputMass.input)}
                                                                                helperText={errorInputMass.input}
                                                                                placeholder='Nombre'
                                                                                InputProps={{
                                                                                    endAdornment: (
                                                                                        <IconButton
                                                                                            onClick={() => {addMass(indexSize, indexMass)}}
                                                                                        >
                                                                                            <CheckIcon />
                                                                                        </IconButton>
                                                                                    )
                                                                                }}
                                                                                sx={{
                                                                                    width: '70%'
                                                                                }}
                                                                            />
                                                                        </Box>
                                                                    ) : null
                                                                }
                                                            </Box>
                                                            <Box>
                                                                <TextField
                                                                    // variant="standard"
                                                                    size='small'
                                                                    value={cost.price}
                                                                    onChange={(event) => {handleChangeCost(event.target.value, indexSize, mass)}}
                                                                    disabled={!edit}
                                                                    // error={Boolean(errors.price ? errors.price[size][mass] : false)}
                                                                    // helperText={errors.price ? errors.price[size][mass] : ''}
                                                                    error={Boolean(errorsCurrentSizesList[`${size}x${mass}xcost`])}
                                                                    helperText={errorsCurrentSizesList[`${size}x${mass}xcost`]}
                                                                    placeholder={'Precio $'}
                                                                    sx={{
                                                                        width: '160px'
                                                                    }}
                                                                />
                                                            </Box>
                                                            {
                                                                edit && indexMass ? (
                                                                    <Box
                                                                        sx={{
                                                                            position: 'absolute',
                                                                            top: '0px',
                                                                            right: '100%'
                                                                        }}
                                                                    >
                                                                        <IconButton
                                                                            onClick={() => {closeLineMass(indexSize, mass)}}
                                                                        >
                                                                            <CloseIcon />
                                                                        </IconButton>
                                                                    </Box>
                                                                ) : null
                                                            }
                                                        </Box>
                                                        
                                                    ))
                                                }
                                                {
                                                    edit ? (
                                                        <Box
                                                            sx={{
                                                                position: 'relative',
                                                                right: '40px'
                                                            }}
                                                        >
                                                            <IconButton
                                                                onClick={() => {addNewLineMass(indexSize)}}
                                                            >
                                                                <AddCircleOutlineIcon />
                                                            </IconButton>
                                                        </Box>
                                                    ) : null
                                                }

                                            </Collapse>
                                        </Grid>
                                        {
                                            edit && indexSize ? (
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        top: '8px',
                                                        right: '95%'
                                                    }}
                                                >
                                                    <IconButton
                                                        onClick={() => {closeLineSize(size)}}
                                                    >
                                                        <CloseIcon />
                                                    </IconButton>
                                                </Box>
                                            ) : null
                                        }
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
                            onClick={addNewLineSize}
                        >
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Box>
                ) : null
            }
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '-32px',
                    right: '0px'
                }}
            >
                <IconButton
                    onClick={handleEdit}
                    disabled={loading}
                    sx={errorStyles(errors)}
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
        </Box>
    )
}

export default PizzaCharacteristics