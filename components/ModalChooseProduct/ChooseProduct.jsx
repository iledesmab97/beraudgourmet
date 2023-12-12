'use client'

import { forwardRef } from 'react'
import AboutPizza from './AboutPizza'
import CustomizePizza from './CustomizePizza'
import FooterModalChooseProduct from './FooterModalChooseProduct'
import useGetModal from '@/hooks/useGetModal'
import useGetOrder from '@/hooks/useGetOrders'
import useHandleOrder from '@/hooks/useHandleOrder'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'

const ChooseProduct = forwardRef(function ChooseProduct (props, ref) {

    const { product, edit, handleCloseModalOrder } = useGetModal({modalType:'order' })
    const { handleAddOrder, handleUpdateOrder } = useGetOrder()

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
        marginTop: 0,
        marginLeft: 0,
        padding: 4,
        paddingBottom: 0,
        paddingRight: 0,
        transform: 'translate(-50%, -50%)',
        width,
        height: 600,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        // p: 3,
        borderRadius: 5,
        overflow: 'hidden'
    }

    return (
        <Grid
            id='container-modal-order'
            {...props}
            ref={ref}
            variant='modal'
            sx={style}
            direction='row'
            justifyContent='center'
            alignItems='stretch'
            container
            item
            // xs={10}
            // sm={9}
            // md={9}
            // lg={9}
            // xl={8}
        >
            <Grid
                container
                sx={{
                    height: '90%',
                    overflow: 'scroll'
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
            />

        </Grid>
    )
})

export default ChooseProduct