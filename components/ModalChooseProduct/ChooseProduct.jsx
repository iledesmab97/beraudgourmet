'use client'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'

import AboutPizza from './AboutPizza'
import CustomizePizza from './CustomizePizza'
import FooterModalChooseProduct from './FooterModalChooseProduct'

import { forwardRef } from 'react'
import useGetModal from '@/hooks/useGetModal'
import useGetOrder from '@/hooks/useGetOrders'
import useHandleOrder from '@/hooks/useHandleOrder'
import useHandleShoppingGuide from '@/hooks/useHandleShoppingGuide'

const ChooseProduct = forwardRef(function ChooseProduct (props, ref) {

    const { product, edit, handleCloseModalOrder } = useGetModal({modalType:'order' })
    const { handleAddOrder, handleUpdateOrder } = useGetOrder()
    const { nextStepGuide } = useHandleShoppingGuide()

    const {
        currentProduct,
        totalPrice,
        inputs,
        handleSize,
        handleQuantity,
        handleMass,
        handleIngredientsModal,
        handleExtra,
        handleAddedItem
    } = useHandleOrder({ product })

    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'))
    
    let width = ''

    if (isSmallScreen) {
        width = '500px'
    } else if (isLargeScreen) {
        width = '860px'
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        m: '0px',
        transform: 'translate(-50%, -50%)',
        width: {
            xs: '324px',
            sm: '500px',
            md: '860px'
        },
        height: {
            xs: '80%',
            md: '600px'
        },
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 5,
        overflow: 'hidden',
        '&.MuiGrid-root': {
            m: '0px'
        }
    }

    return (
        <Grid
            id='container-modal-order'
            {...props}
            ref={ref}
            variant='modal'
            direction='row'
            justifyContent='center'
            alignItems='stretch'
            sx={style}
            spacing={{
                xs: 2,
                sm: 4
            }}
            container
            item
        >
            <Grid
                id='container-modal-order-pizza'
                item
                container
                sx={{
                    height: {
                        xs: '85%',
                        sm: '90%'
                    },
                    overflowY: {
                        xs: 'auto',
                        md: 'hidden'
                    },
                    pr: {
                        xs: 2,
                        sm: 4
                    }
                }}
            >
                <Grid
                    item
                    xs={12}
                >
                    <Typography variant='encabezado'>
                        {product.name}
                    </Typography>
                </Grid>

                <AboutPizza product={product} />

                <CustomizePizza
                    currentProduct={currentProduct}
                    name={product?.information?.name}
                    ingredientsProduct={product?.ingredients}
                    customizePizza = {{
                        size: inputs.size,
                        handleSize,
                        mass: inputs.mass,
                        handleMass,
                        ingredientsModal: inputs.ingredientsModal,
                        handleIngredientsModal,
                        extra: inputs.extra,
                        handleExtra
                    }}
                />
            </Grid>

            <FooterModalChooseProduct
                handleQuantity={handleQuantity}
                quantity={inputs.quantity}
                totalPrice={totalPrice}
                edit={edit}
                handleAddOrder={handleAddOrder}
                currentProduct={currentProduct}
                handleCloseModalOrder={handleCloseModalOrder}
                handleAddedItem={handleAddedItem}
                handleUpdateOrder={handleUpdateOrder}
                nextStep={nextStepGuide}
            />

        </Grid>
    )
})

export default ChooseProduct