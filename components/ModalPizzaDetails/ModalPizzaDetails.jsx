'use client'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import PizzaImage from './PizzaImage'
import PizzaText from './PizzaText'
import PizzaIngredients from './PizzaIngredients'
import PizzaCharacteristics from './PizzaCharacteristics'

import InputUpdate from '@/components/InputUpdate/InputUpdate'

import { useEffect, useState } from 'react'
import useGetProducts from '@/hooks/useGetProducts'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'
import { getPizzasWithCosts, updatePizza, addNewPizza } from '@/services/productApi'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    height: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: 5,
    pb: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
}

function validate(pizza) {
    const errors = {}
    const { name, ingredients, price } = pizza
    if (!name) errors.name = 'Debes ingresar algún nombre'
    // Ingredients

    // Price
    Object.keys(price).forEach(size => {
        Object.keys(price[size]).forEach(mass => {
            if (!price[size][mass]) {
                errors.price = {
                    [size]: {
                        [mass]: 'Debes ingresar un precio'
                    }
                }
            }
        })
    })

    return errors
}

function ModalPizzaDetails({ openPizzaDetail, handleOpenPizzaDetail, currentPizza, pizzaNew }) {

    const { products, handleUpdateProduct, handleAddProductsList } = useGetProducts({type:'pizzas'})
    const [pizza, setPizza] = useState(currentPizza)
    const { handleUpdateAlertMessage } = useGetAlertMessage()
    const [processing, setProcessing] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (!openPizzaDetail || pizzaNew) return
        const [newPizza] = products.filter(element => element.id === pizza.id)
        setPizza(newPizza)
    }, [products])

    function handleChangeInput({value, property}) {
        setPizza(prevState => ({
            ...prevState,
            [property]: value
        }))
    }

    async function addPizza() {
        console.log('agregando nueva pizza...')
        setProcessing(true)

        // Validación de datos
        const newErrors = validate(pizza)
        if (Object.keys(newErrors).length) {
            setProcessing(false)
            return setErrors(newErrors)
        }

        // Peparando los datos
        const pizzaToCreate = {
            ...pizza
        }
        delete pizzaToCreate.price
        const costs = []
        Object.keys(pizza.price).forEach(size => {
            Object.keys(pizza.price[size]).forEach(mass => {
                const cost = pizza.price[size][mass]
                costs.push({size, mass, cost})
            })
        })
        pizzaToCreate.costs = costs

        // Haciendo la solicitud
        const response = await addNewPizza(pizzaToCreate)
        let text, status
        if (response.message) {
            text = response.message
            status = 'error'
        } else {
            text = 'Pizza created successfully'
            status = 'success'
        }
        handleUpdateAlertMessage({
            checked: true,
            text,
            status
        })
        if (!response.message) {
            await getPizzasWithCosts().then(data => {
                handleAddProductsList({
                type: 'pizzas',
                products: data
                })
            })
            console.log('Pizza agregada exitosamente')
            handleOpenPizzaDetail(false)
        }
        setProcessing(false)
    }

    return (
        <Modal
            open={ openPizzaDetail }
            onClose={() => {handleOpenPizzaDetail(false)}}
        >
            <Box
                sx={style}
            >
                <InputUpdate
                    value={pizza.name}
                    updateProperty={updatePizza}
                    updateState={handleUpdateProduct}
                    properties={{ property: 'name', id: pizza.id}}
                    handleChangeInput={handleChangeInput}
                    pizzaNew={pizzaNew}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    placeholder={'Nombre'}
                />

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
                    <PizzaImage
                        pizza={pizza}
                        property={'image'}
                        handleChangeInput={handleChangeInput}
                        pizzaNew={pizzaNew}
                        placeholder={'URL de la pizza'}
                    />

                    <Divider sx={{ width: '100%'}} />
                    
                    <InputUpdate
                        value={pizza.text}
                        updateProperty={updatePizza}
                        updateState={handleUpdateProduct}
                        properties={{ property: 'text', id: pizza.id}}
                        fullWidth={true}
                        handleChangeInput={handleChangeInput}
                        pizzaNew={pizzaNew}
                        placeholder={'Texto de la pizza'}
                    />
                    
                    <Divider sx={{ width: '100%'}} />
                    
                    <PizzaIngredients
                        ingredients={pizza.ingredients}
                        id={pizza.id}
                        handleChangeInput={handleChangeInput}
                        pizzaNew={pizzaNew}
                        property={'ingredients'}
                    />
                    
                    <Divider sx={{ width: '100%'}} />
                    
                    <PizzaCharacteristics
                        pizzaId={pizza.id}
                        sizes={pizza.price}
                        handleChangeInput={handleChangeInput}
                        pizzaNew={pizzaNew}
                        property={'price'}
                        errors={errors}
                    />

                </Box>
                {
                    pizzaNew ? (
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: '24px',
                                right: '40px'
                            }}
                        >
                            <Button
                                variant='contained'
                                onClick={addPizza}
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

export default ModalPizzaDetails