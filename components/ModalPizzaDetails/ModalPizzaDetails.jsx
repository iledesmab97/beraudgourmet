'use client'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import PizzaImage from './PizzaImage'
import PizzaText from './PizzaText'
import PizzaIngredients from './PizzaIngredients'
import PizzaCharacteristics from './PizzaCharacteristics'

import InputUpdate from '@/components/InputUpdate/InputUpdate'

import { useEffect, useState } from 'react'
import useGetProducts from '@/hooks/useGetProducts'
import { updatePizza } from '@/services/productApi'

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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
}

function ModalPizzaDetails({ openPizzaDetail, handleOpenPizzaDetail, currentPizza }) {

    const { products, handleUpdateProduct } = useGetProducts({type:'pizzas'})
    const [pizza, setPizza] = useState(currentPizza)

    useEffect(() => {
        if (!openPizzaDetail) return
        const [newPizza] = products.filter(element => element.id === pizza.id)
        setPizza(newPizza)
    }, [products])

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
                    <PizzaImage pizza={currentPizza} />

                    <Divider sx={{ width: '100%'}} />
                    
                    <InputUpdate
                        value={pizza.text}
                        updateProperty={updatePizza}
                        updateState={handleUpdateProduct}
                        properties={{ property: 'text', id: pizza.id}}
                        fullWidth={true}
                    />
                    
                    <Divider sx={{ width: '100%'}} />
                    
                    <PizzaIngredients ingredients={currentPizza.ingredients} />
                    
                    <Divider sx={{ width: '100%'}} />
                    
                    <PizzaCharacteristics sizes={currentPizza.price} />

                </Box>                
            </Box>
        </Modal> 
    )
}

export default ModalPizzaDetails