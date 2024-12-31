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

import { forwardRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useGetModal from '@/hooks/useGetModal'
import useGetOrder from '@/hooks/useGetOrders'
import useHandleOrder from '@/hooks/useHandleOrder'
import useHandleShoppingGuide from '@/hooks/useHandleShoppingGuide'

import { addProductDetailsThunk, removeProductDetailsThunk } from '@/stores/actions/productDetails'

const ChooseProduct = forwardRef(function ChooseProduct (props, ref) {

    const { product, edit, handleCloseModalOrder } = useGetModal({modalType:'order' })
    const { data: productDetails, status, error } = useSelector(
        (state) => state.productDetails
    );
    const { handleAddOrder, handleUpdateOrder } = useGetOrder()
    const { nextStepGuide } = useHandleShoppingGuide()
    const dispatch = useDispatch();

    const {
        currentProduct,
        inputs,
        handleSize,
        handleQuantity,
        handleMass,
        handleIngredientsModal,
        handleExtra,
    } = useHandleOrder({ productDetails })

    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'))
    
    useEffect(() => {
        dispatch(addProductDetailsThunk({id: product.id, type: product.productType}))
        return () => {
            dispatch(removeProductDetailsThunk())
        }
    }, [])

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
                spacing={2}
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

                {
                    currentProduct ? (
                        <CustomizePizza
                            currentProduct={currentProduct}
                            name={productDetails?.information?.name}
                            ingredientsProduct={productDetails?.ingredients}
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
                    ) : null
                }
            </Grid>

            {
                currentProduct ? (
                    <FooterModalChooseProduct
                        handleQuantity={handleQuantity}
                        quantity={inputs.quantity}
                        edit={edit}
                        handleAddOrder={handleAddOrder}
                        currentProduct={currentProduct}
                        handleCloseModalOrder={handleCloseModalOrder}
                        handleUpdateOrder={handleUpdateOrder}
                        nextStep={nextStepGuide}
                    />
                ) : null
            }

        </Grid>
    )
})

export default ChooseProduct