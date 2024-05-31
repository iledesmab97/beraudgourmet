import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'

import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'

import { useState } from 'react'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'

import { updateOrder } from '@/services/orderApi'

import styles from './ModalOrderDetails.module.css'

// const orderInformation = [
//     {title: 'Método de Pago', name: 'paymentMethod'},
//     {title: 'Cliente', name: 'name'},
//     {title: 'Teléfono', name: 'phoneNumber'}
// ]

const properties = {
    paymentMethod: 'Método de Pago',
    StripeId: 'StripeId'
}

const paymentMethods = {
    cash: 'efectivo',
    transfer: 'transferencia',
    stripe: 'stripe'
}

function OrderData({currentOrder, handleUpdateOrderProperty}) {

    const [currentValues, setCurrentValues] = useState({
        paymentMethod: currentOrder.paymentMethod,
        StripeId: currentOrder.StripeId
    })
    const [editing, setEditing] = useState({
        paymentMethod: false,
        StripeId: false
    })
    const { handleUpdateAlertMessage } = useGetAlertMessage()

    function handleCurrentValues({property, value}) {
        const newCurrentValues = {
            ...currentValues,
            [property]: value
        }
        setCurrentValues(newCurrentValues)
    }

    async function handleEditing(property) {
        const newEditing = {
            ...editing,
            [property]: !editing[property]
        }
        if (!newEditing[property]) {
            const updated = await updateProperty( currentOrder.id, { property, value: currentValues[property] })
            if (!updated) return
        }
        setEditing(newEditing)
    }

    async function updateProperty(id, {property, value}) {
        console.log('Editando', properties[property], '...')
        const response = await updateOrder(id, {property, value})
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
            handleUpdateOrderProperty({
                id: currentOrder.id,
                property,
                value
            })
            console.log('Información guardada con exito')
            return true
        } else {
            console.log('No se ha guardado la información exitosamente')
            return false
        }
    }

    return (
        <>
            <Typography variant='title'>DATOS DE LA ORDEN</Typography>
            <Typography
                className={ currentOrder.closed ? styles.closed : styles.pending }
                align='center'
                sx={{
                    width: '100%',
                    p: 1,
                    borderRadius: 3
                }}
            >
                {currentOrder.closed ? 'ENTREGADO' : 'PENDIENTE'}
            </Typography>

            <Typography
                className={ currentOrder.paid ? styles.closed : styles.pending }
                align='center'
                sx={{
                    width: '100%',
                    p: 1,
                    borderRadius: 3
                }}
            >
                {currentOrder.paid ? 'COBRADO' : 'POR COBRAR'}
            </Typography>
            <Box
                // key={user[item.name]}
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Typography
                    variant='p'
                    gutterBottom
                >
                    Método de Pago
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <FormControl>
                        <Select
                            value={currentValues.paymentMethod}
                            onChange={(event) => { handleCurrentValues({ property:'paymentMethod' , value: event.target.value }) }}
                            disabled={!editing.paymentMethod}
                        >
                            {
                                Object.keys(paymentMethods).map(method => (
                                    <MenuItem key={method} value={method}>{paymentMethods[method].toUpperCase()}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <IconButton
                        onClick={() => {handleEditing('paymentMethod')}}
                    >
                        {
                            editing.paymentMethod ? (
                                <CheckIcon />
                            ) : (
                                <EditIcon />
                            )
                        }
                    </IconButton>
                </Box>
            </Box>
            <Box
                // key={user[item.name]}
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Typography
                    variant='p'
                    gutterBottom
                >
                    {currentOrder.paymentMethod === 'stripe' ? 'ID Stripe' : 'Nº Transferencia'}
                </Typography>
                <Grid
                    container
                    alignItems={'center'}
                    sx={{
                        width: '50%',
                    }}
                >
                    <Grid item xs>
                        <TextField
                            value={currentValues.StripeId}
                            onChange={(e) => {handleCurrentValues({property: 'StripeId', value: e.target.value})}}
                            disabled={!editing.StripeId}
                            fullWidth
                        />
                    </Grid>
                    <Grid item sx={{ width: 'fit-content'}} >
                        <IconButton
                            onClick={() => {handleEditing('StripeId')}}
                        >
                            {
                                editing.StripeId ? (
                                    <CheckIcon />
                                ) : (
                                    <EditIcon />
                                )
                            }
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
            <Box
                // key={user[item.name]}
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Typography
                    variant='p'
                    gutterBottom
                >
                    Recoger en tienda
                </Typography>
                <Typography
                    variant='p'
                    gutterBottom
                >
                    {currentOrder.delivery ? 'NO' : 'Sí'}
                </Typography>
            </Box>
        </>
    )
}

export default OrderData