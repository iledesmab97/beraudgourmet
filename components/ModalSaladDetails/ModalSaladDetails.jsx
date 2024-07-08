'use client'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

import SaladImage from './SaladImage'
import SaladIngredients from './SaladIngredients'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'

import InputUpdate from '@/components/InputUpdate/InputUpdate'
import CostSection from '@/components/ModalSaladDetails/CostSection'

import { useEffect, useState } from 'react'
import useGetProducts from '@/hooks/useGetProducts'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'
import { getPizzasWithCosts, updateSalad, addNewSalad } from '@/services/productApi'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '324px',
        sm: '500px',
        md: '750px'
    },
    height: {
        xs: '80%',
        md: '700px'
    },
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: {
        xs: 2,
        sm: 4,
        md: 5
    },
    pb: {
        xs: 10,
        sm: 10,
        md: 10
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
}

const typesOfPizzas = {
    standard: 'Estandar',
    customizable: 'Personalizable'
}

function calculateWithTypePizza(type) {
    const styles = {}
    switch (type) {
        case 'standard': {
            // styles.boxSizing = 'content-box',
            styles.width = '56px'
            break
        }
        case 'customizable': {
            // styles.boxSizing = 'content-box',
            styles.width = '94px'
            break
        }
        default: {
            // styles.boxSizing = 'content-box',
            styles.width = '56px'
            break
        }
    }
    return styles
}

function styleGiver(matches) {
    let styles = {
        width:'fit-content',
        minWidth: '100px',
        position: 'absolute',
        top: {
            xs: '66px',
            sm: '0px'
        }
    }
    if (matches) {
        styles = {
            ...styles,
            left: '26px'
        }
    } else {
        styles = {
            ...styles,
            right: '0px'
        }
    }
    return styles
}

function validate(inputsChecked) {
    const errors = {}
    const { name, image, text, ingredients, cost, type } = inputsChecked
    if (!name) errors.name = true
    if (!image) errors.image = true
    if (!text) errors.text = true
    if (!ingredients && type !== 'customizable') errors.ingredients = true
    if (!cost) errors.cost = true
    return errors
}

function ModalSaladDetails({ openSaladDetail, handleOpenSaladDetail, saladSelected, saladNew }) {

    const { products, handleUpdateProduct, handleAddProductsList, handleAddProduct } = useGetProducts({type:'salads'})
    const [salad, setSalad] = useState(saladSelected)
    const { handleUpdateAlertMessage } = useGetAlertMessage()
    const [processing, setProcessing] = useState(false)
    const [errors, setErrors] = useState({})
    const [inputsChecked, setInputsChecked] = useState({})
    // const [saladType, setSaladType] = useState( saladNew ? '' : salad.type)
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))

    useEffect(() => {
        if (!openSaladDetail || saladNew) return
        const [newSalad] = products.filter(element => element.id === salad.id)
        setSalad(newSalad)
    }, [products])

    useEffect(() => {
        setSalad(saladSelected)
    }, [saladSelected])

    // useEffect(() => {
    //     if ( saladType === 'customizable' ) {
    //         const newSalad = { ...salad}
    //         newSalad.ingredients = ['']
    //         setSalad(newSalad)
    //     } else {
    //         const newInputChecked = { ...inputsChecked }
    //         newInputChecked.ingredients = false

    //         if ( inputsChecked.ingredients !== newInputChecked.ingredients ) {
    //             setInputsChecked(newInputChecked)
    //         }
    //     }
    // }, [saladType])

    function handleChangeInput({value, property}) {
        setSalad(prevState => ({
            ...prevState,
            [property]: value
        }))
    }

    function handleInputsChecked(property, value) {
        const newInputsChecked = {
            ...inputsChecked,
            [property]: value
        }
        setInputsChecked(newInputsChecked)
        const newErrorsProperty = validate(newInputsChecked)[property]
        setErrors(prevState => ({
            ...prevState,
            [property]: newErrorsProperty
        }))
    }

    async function addSalad() {
        console.log('Agregando una nueva ensalada...')
        setProcessing(true)

        // Validación de datos
        console.log('Validando datos...')
        const newErrors = validate(inputsChecked)

        if (Object.keys(newErrors).length) {
            console.log('Error en la validación de datos')
            setProcessing(false)
            return setErrors(newErrors)
        }

        // Preparando los datos
        const saladToCreate = {
            ...salad,
            ingredients: salad.ingredients,
            // type: saladType
        }
        delete saladToCreate.price
        delete saladToCreate.totalPrice

        // Haciendo la solicitud
        const response = await addNewSalad(saladToCreate)
        let text, status
        if (response.message) {
            text = response.message
            status = 'error'
        } else {
            text = 'Ensalada creada exitosamente'
            status = 'success'
        }
        handleUpdateAlertMessage({
            checked: true,
            text,
            status
        })
        if (!response.message) {
            handleAddProduct({ type: 'salads', newProduct: response })
            console.log('Ensalada agregada exitosamente')
            setProcessing(false)
            return handleOpenSaladDetail(false)
        }
        console.log('No se ha podido agregar la ensalada correctamente...')
        setProcessing(false)
    }

    function updateSaladState(product) {
        const newProduct = {
            ...product,
            type: 'salads',
        }
        handleUpdateProduct(newProduct)
    }

    // function handleChangeTypePizza(value) {
    //     setSaladType(value)
    //     handleInputsChecked( 'type', value)
    //     handleChangeInput({value, property: 'type'})
    // }

    return (
        <Modal
            open={ openSaladDetail }
            onClose={() => {handleOpenSaladDetail(false)}}
        >
            <Box
                sx={style}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: {
                            xs: '60px',
                            sm: '0px'
                        }
                    }}
                >
                    <InputUpdate
                        value={salad.name}
                        updateProperty={updateSalad}
                        updateState={updateSaladState}
                        properties={{ property: 'name', id: salad.id}}
                        handleChangeInput={handleChangeInput}
                        handleInputsChecked={handleInputsChecked}
                        pizzaNew={saladNew}
                        placeholder={'Nombre'}
                        errors={errors?.name}
                    />
                    {/* <Box
                        sx={styleGiver(matches)}
                    >
                        {
                            saladNew ? (
                                <FormControl fullWidth>
                                    <InputLabel>Tipo</InputLabel>
                                    <Select
                                        label='Tipo'
                                        value={saladType}
                                        onChange={(event) => { handleChangeTypePizza(event.target.value) }}
                                    >
                                        <MenuItem value={'standard'}>Estandar</MenuItem>
                                        <MenuItem value={'customizable'}>Personalizable</MenuItem>
                                    </Select>
                                </FormControl>
                            ) : (
                                <TextField
                                    value={ saladType ? typesOfPizzas[saladType] : 'Estandar'}
                                    disabled={true}
                                    inputProps={{
                                        sx: calculateWithTypePizza(saladType)
                                    }}
                                />
                            )
                        }
                    </Box> */}
                </Box>

                <Box
                    sx={{
                        height: '90%',
                        width: '100%',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: '16px',
                        pr: '8px',
                        boxSizing: 'border-box'
                    }}
                >
                    <SaladImage
                        salad={salad}
                        property={'image'}
                        updateProperty={updateSalad}
                        updateState={updateSaladState}
                        handleChangeInput={handleChangeInput}
                        handleInputsChecked={handleInputsChecked}
                        saladNew={saladNew}
                        placeholder={'URL de la ensalada'}
                        errors={errors?.image}
                    />

                    <Divider sx={{ width: '100%'}} />
                    
                    <InputUpdate
                        value={salad.text}
                        updateProperty={updateSalad}
                        updateState={updateSaladState}
                        properties={{ property: 'text', id: salad.id}}
                        fullWidth={true}
                        handleChangeInput={handleChangeInput}
                        handleInputsChecked={handleInputsChecked}
                        pizzaNew={saladNew}
                        placeholder={'Texto de la ensalada'}
                        errors={errors?.text}
                    />
                    
                    <Divider sx={{ width: '100%'}} />
                    
                    {/* {
                        saladType !== 'customizable' ? (
                            <SaladIngredients
                                ingredients={salad.ingredients}
                                id={salad.id}
                                handleChangeInput={handleChangeInput}
                                saladNew={saladNew}
                                property={'ingredients'}
                                errors={errors?.ingredients}
                                handleInputsChecked={handleInputsChecked}
                            />
                        ) : null
                    } */}

                    <SaladIngredients
                        ingredients={salad.ingredients}
                        id={salad.id}
                        handleChangeInput={handleChangeInput}
                        handleInputsChecked={handleInputsChecked}
                        saladNew={saladNew}
                        property={'ingredients'}
                        errors={errors?.ingredients}
                    />
                    
                    <Divider sx={{ width: '100%'}} />
                    
                    {/* <PizzaCharacteristics
                        pizzaId={salad.id}
                        sizes={salad.price}
                        handleChangeInput={handleChangeInput}
                        saladNew={saladNew}
                        property={'price'}
                        errors={errors?.price}
                        handleInputsChecked={handleInputsChecked}
                    /> */}

                    <CostSection
                        salad={saladSelected}
                        saladNew={saladNew}
                        errors={errors}
                        handleChangeInput={handleChangeInput}
                        handleInputsChecked={handleInputsChecked}
                    />

                </Box>
                {
                    saladNew ? (
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: '24px',
                                right: '40px'
                            }}
                        >
                            <Button
                                variant='contained'
                                onClick={addSalad}
                                disabled={processing}
                            >
                                { processing ? 'Procesando' : 'Agregar'}
                            </Button>                
                        </Box>
                    ) : null
                }
            </Box>
        </Modal> 
    )
}

export default ModalSaladDetails