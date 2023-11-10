'use client'

import { forwardRef } from 'react'
import AboutPizza from './AboutPizza'
import CustomizePizza from './CustomizePizza'
import useGetModal from '@/hooks/useGetModal'
import useHandleOder from '@/hooks/useHandleOrder'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 960,
    height: 600,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
    borderRadius: 5
}

const ChooseProduct = forwardRef(function ChooseProduct (props, ref) {

    // console.log('props:', props)
    const { product } = useGetModal({modalType:'order' })

    const {
      totalPrice,
      inputs,
      handleQuantity,
      handleMass,
      handleIngredients,
      handleExtra
    } = useHandleOder({ product })

    return (
        <Box {...props} ref={ref} sx={style}>
            <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='stretch'
            spacing={4}
            sx={{
                width: '100%',
                height: '100%',
                marginTop: 0,
                marginLeft: 0,
            }}>

            <AboutPizza product={product} />

            <CustomizePizza
                name={product?.information?.name}
                ingredientsProduct={product?.ingredients}
                customizePizza = {{
                mass: inputs.mass,
                handleMass,
                ingredients: inputs.ingredients,
                handleIngredients,
                extra: inputs.extra,
                handleExtra
                }}
            />

            <Grid
                container
                direction='row'
                justifyContent='space-between'
                alignItems="center"
                sx={{
                height: '15%',
                py: 1,
                px: 5
                }}
            >
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'baseline' }}>
                <Button
                    size='small'
                    variant='contained'
                    name='-'
                    onClick={handleQuantity}
                >
                    -
                </Button>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {inputs.quantity}
                </Typography>
                <Button
                    size='small'
                    variant='contained'
                    name='+'
                    onClick={handleQuantity}
                >
                    +
                </Button>
                <Typography id="modal-modal-description" sx={{ ml: 5 }}>
                    ${totalPrice}
                </Typography>
                </Box>
                <Button variant='contained' onClick={() => {}}>Agregar</Button>
            </Grid>
            </Grid>
        </Box>
    )
})

export default ChooseProduct