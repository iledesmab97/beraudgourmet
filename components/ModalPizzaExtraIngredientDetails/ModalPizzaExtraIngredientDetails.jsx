import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputAdornment from '@mui/material/InputAdornment'

import InputUpdate from '@/components/InputUpdate/InputUpdate'

import { useState, useEffect, useRef } from 'react'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'

import { updateExtraIngredient, makeExtraIngredient, removeExtraIngredient } from '@/services/productApi'

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
    height: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: {
        xs: 2,
        sm: 4,
        md: 5
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
}

function ModalPizzaExtraIngredientDetails({ openExtraIngredientDetails, handleOpenExtraIngredientDetails, extraIngredientSelected, updateExtraIngredientOfList, extraIngredients }) {

    const [extraIngredient, setExtraIngredient] = useState(extraIngredientSelected)
    const [loading, setLoading] = useState(false)
    const totalNewExtraIngredient = useRef(null)
    const { handleUpdateAlertMessage } = useGetAlertMessage()

    async function updateExtraIngredientDB(id, {property, value}) {
        const response = await updateExtraIngredient(id, {[property]: value})
        totalNewExtraIngredient.current = response
        if (response.message) return response
        return 'Se ha actualizado exitosamente'
    }

    function updateExtraIngredientFront({ id, property, value }) {
        const newProperties = {}
        if (property === 'name') {
            newProperties.name = value
        } else if (property === 'cost') {
            const { cost, costIVAStripe } = totalNewExtraIngredient.current
            newProperties.price = cost
            newProperties.totalPrice = costIVAStripe
        } else if (property === 'available') {
            newProperties.available = value
        }
        const newExtraIngredient = {...extraIngredient, ...newProperties}
        updateExtraIngredientOfList({ newExtraIngredient, lastExtraIngredient: {...extraIngredient}, property })
        setExtraIngredient(newExtraIngredient)
    }

    async function handleChangeAvailable(newValue) {
        setLoading(true)
        console.log('guardando información...')

        const response = await updateExtraIngredientDB(extraIngredient.id, { property: 'available', value: newValue })
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
        if (!response.message) {
            updateExtraIngredientFront({ property: 'available', value: newValue })
            setLoading(false)
        }
        console.log('Ha ocurrido un error...')
        setLoading(false)
    }

    function validationName(name) {
        let error = ''
        if (!name) error = 'Este campo no puede estar vacío'
        else if (extraIngredients[name]) error = 'El nombre del ingrediente ya existe'
        return error
    }

    function validationPrice(price) {
        let error = ''
        const isNumber = !/[^0-9]/.test(price)
        if (!price) error = 'Este campo no puede estar vacio'
        else if (!isNumber) error = 'Debes colocar solo números'
        else if (Number(price) < 0) error = 'Colocar solo números positivos'
        return error
    }

    return (
        <Modal
            open={openExtraIngredientDetails}
            onClose={() => {handleOpenExtraIngredientDetails(false)}}
        >
            <Box
                sx={style}
            >
                <Grid
                    container
                    spacing={3}
                    sx={{
                        position: 'relative'
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        sx={{
                            height: 'fit-content',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Typography
                            component={'h1'}
                            variant='encabezado'
                            sx={{ fontSize: '2.0rem' }}
                        >
                            {extraIngredient.name} Nº{extraIngredient.id}
                        </Typography>
                    </Grid>
                    
                    
                    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>Nombre:</Typography>
                    </Grid>
                    <Grid item xs sx={{ display: 'flex', justifyContent: 'flex-end', alignItems:'center' }}>
                        <InputUpdate
                            value={extraIngredient.name}
                            updateProperty={updateExtraIngredientDB}
                            properties={{ id:extraIngredient.id, property: 'name' }}
                            updateState={updateExtraIngredientFront}
                            validateError={validationName}
                            sx={{
                                width: '200px'
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    
                    
                    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }} >
                        <Typography>Precio:</Typography>
                    </Grid>
                    <Grid item xs sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <InputUpdate
                            value={extraIngredient.price}
                            updateProperty={updateExtraIngredientDB}
                            properties={{ id: extraIngredient.id, property: 'cost' }}
                            updateState={updateExtraIngredientFront}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            validateError={validationPrice}
                            sx={{
                                width: '160px'
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    
                    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }} >
                        <Typography>Precio al público:</Typography>
                    </Grid>
                    <Grid item xs sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} >
                        <TextField
                            value={extraIngredient.totalPrice}
                            disabled
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                            }}
                            sx={{
                                width: '160px'
                            }}
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }} >
                        <Typography>Cantidad en inventario:</Typography>
                    </Grid>
                    <Grid item xs sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <InputUpdate
                            value={'infinity'}
                            updateProperty={null}
                            properties={null}
                            updateState={null}
                            sx={{
                                width: '160px'
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={extraIngredient.available}
                                onChange={(event) => {handleChangeAvailable(event.target.checked)}}
                                disabled={loading}
                            />
                        }
                        label={ extraIngredient.available ? 'Disponible' : 'No disponible'}
                        sx={{
                            position: 'absolute',
                            top: '24px',
                            right: '0px',
                        }}
                    />
                </Grid>
            </Box>
        </Modal>
    )
}

export default ModalPizzaExtraIngredientDetails