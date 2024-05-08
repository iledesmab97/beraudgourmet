'use client'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import { useEffect, useState, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {CardElement, PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js'

import useGetProducts from '@/hooks/useGetProducts'
import useLocalData from '@/hooks/useLocalData'
import useGetAlertDialogMessage from '@/hooks/useGetAlertDialogMessage'

import dayjs from 'dayjs'
import { contactUs } from '@/utils/contact'
import { descriptionOrder } from '@/utils/preparingData'
import { updatePaymentRequest } from '@/services/checkoutApi'
import { registerOrder } from '@/services/orderApi'

import styles from './CheckoutForm.module.css'

const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK

export default function CheckoutForm({user, place, orders, checkout, payment_method, dataStripe, handlePaymentMethod, handleCloseModal, handleDataStripe}) {

    const stripe = useStripe()
    const elements = useElements()
    const router = useRouter()
    const firstTime = useRef(true)
    const { removeLocalData } = useLocalData()
    const { openAlertDialogMessage } = useGetAlertDialogMessage({ type: 'phoneMissing'})

    const textOrderToWhatsapp = orders.map(order => descriptionOrder(order)).join("; ")

    const orderItems = orders.map(item => {
        const { size, mass, quantity, ingredientsModal, extra, totalPrice } = item
        return {
            name: item.name,
            itemType: 'pizza',
            size,
            mass,
            quantity,
            ingredientsOut: ingredientsModal,
            extraIngredients: Object.keys(extra).map(extraIngredient => ({
                name: extraIngredient,
                quantity: extra[extraIngredient]
            })),
            costItemPerUnit: totalPrice,
            totalCostByItem: Number(totalPrice) * quantity,
            description: descriptionOrder(item)
        }
    })
    const dataOrders = {
        userId: user.id,
        storeId: place.closerStore.id,
        totalCostByItems: checkout.totalPriceCar,
        commissions: Number(checkout.commissionStripe),
        totalCost: checkout.totalClient,
        applicationDate: dayjs().format('DD/MM/YYYY - hh:mm a'),
        deliveryDate: place.deadLine.date.realDate + ' - ' + place.deadLine.time.realTime,
        delivery: place.inputsHome ? true : false,
        itemsList: orderItems,
        deliveryInformation: place.inputsHome
    }

    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [openTooltip, setOpenTooltip] = useState({
        card: false,
        bank: false
    })
    const [checked, setChecked] = useState(false)

    function handleOpenTooltip(paymentMethod) {
        setOpenTooltip(prevState => ({
            ...prevState,
            [paymentMethod]: true
        }))
    }

    function handleCloseTootip(paymentMethod) {
        setOpenTooltip(prevState => ({
            ...prevState,
            [paymentMethod]: false
        }))
    }

    useEffect(() => {
        if (!stripe) return

        const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret')
        
        if (!clientSecret) return

        stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
            switch (paymentIntent.status) {
                case 'succeeded':
                    setMessage('Payment succeded.')
                    break
                case 'processing':
                    setMessage('Your payment is processing.')
                    break
                case 'requires_payment_method':
                    setMessage('Your payment was not successful, please try again.')
                    break
                default:
                    setMessage('Something went wrong.')
                    break
            }
        })

    }, [stripe])

    useEffect(() => {
        return () => {
            if (firstTime.current) {
                firstTime.current = false
            } else {
                handleCloseModal('pay')
            }
        }
    }, [])

    useEffect(() => {
        updatePaymentRequest({payInPlace: checked, stripeId: dataStripe.id})
                .then(data => {
                    if (data.clientSecret) {
                        const { clientSecret, id, status } = data
                        handleDataStripe({clientSecret, id, status})
                    }
                    else console.log('Error:', data.message)
                })
    }, [checked])

    async function handleSubmit(event) {
        event.preventDefault()

        // Confirmar los datos del usuario
        if(!user.numberPhone) {
            return openAlertDialogMessage()
        }

        if (!stripe || !elements) return 
        setIsLoading(true)

        const {paymentIntent, error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // return_url: 'http://localhost:3000/success',
                // capture_method: 'manual'
            },
            redirect: 'if_required'
        })

        if (error) {
            if (error.type === 'card_error' || error.type === 'validation_error') {
                setMessage(error.message)
            } else {
                setMessage('An unexpected error ocurred.')
            }
        } else {
                
            await registerOrder({
                ...dataOrders,
                stripeId: paymentIntent.id,
                paymentMethod: 'stripe',
                paid: !checked,
            })

            removeLocalData('orders')
            removeLocalData('place')

            return router.push('/success')
        }

        // la verificación fue exitosa

        setIsLoading(false)
        alert('Algo salió mal')
    }

    const paymentElementOptions = {
        layout: 'tabs'
        // layout: 'accordion'
    }

    function handleChange() {
        setChecked((prev) => !prev)
    }

    async function bayByTransferens() {
        await registerOrder({
            ...dataOrders,
            paymentMethod: 'transfer',
            paid: false,
        })
        removeLocalData('orders')
        removeLocalData('place')
        contactUs({context: 'transfer', name: user.name, order: textOrderToWhatsapp })
        handleCloseModal('pay')
        return router.push('/success')
    }

    return (
        <Box
            id='payment-form'
            component='form'
            sx={{
                py: '8px',
                pt: payment_method === 'null' ? '8px' : '45px',
                px: '16px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
            }}
        >
            <Box
                variant="outlined"
                onClick={() => {handlePaymentMethod('card')}}
                className={ payment_method === 'null' ? styles.buttonPaymentMethodToSelect : `${styles.buttonPaymentMethodSelected} ${styles.card} ${payment_method === 'card' ? styles.paymentMethodSelected : ''}` }
            >
                <Tooltip
                    title= {
                        <Typography>
                            Targeta de crédito
                        </Typography>
                    }
                    open={payment_method !== 'null' && openTooltip.card}
                    onOpen={() => { handleOpenTooltip('card') }}
                    onClose={() => { handleCloseTootip('card') }}
                >
                    <PaymentIcon className={styles.iconButtonPaymentMethodToSelect} />
                </Tooltip>
                {
                    payment_method === 'null' ?
                        (
                            <Box className={styles.textButtonPaymentMethodToSelect} >
                                <Typography>
                                    {"Tarjeta de crédito".toUpperCase()}
                                </Typography>
                            </Box>
                        ) : null
                }
            </Box>
            <Box
                variant="outlined"
                onClick={() => {handlePaymentMethod('bank')}}
                className={ payment_method === 'null' ? styles.buttonPaymentMethodToSelect : `${styles.buttonPaymentMethodSelected} ${styles.bank} ${payment_method === 'bank' ? styles.paymentMethodSelected : ''}`  }
            >
                <Tooltip
                    title= {
                        <Typography>
                            Transferencia bancaria
                        </Typography>
                    }
                    open={payment_method !== 'null' && openTooltip.bank}
                    onOpen={() => { handleOpenTooltip('bank') }}
                    onClose={() => { handleCloseTootip('bank') }}
                >
                    <AccountBalanceIcon />
                </Tooltip>
                {
                    payment_method === 'null' ?
                        (
                            <Box className={styles.textButtonPaymentMethodToSelect}>
                                <Typography>
                                    {"Transferencia bancaria".toUpperCase()}
                                </Typography>
                            </Box>
                        ) : null
                }
            </Box>
            {
                payment_method === 'null' ?
                    (
                        null
                    ) : (
                        <>
                            {
                                payment_method === 'card' ?
                                    (
                                        <>
                                            <Box
                                                component='div'
                                                sx={{
                                                    position: 'relative',
                                                    width: '100%',
                                                    py: '8px',
                                                    px: '16px'
                                                }}
                                            >
                                                <PaymentElement id='payment-element' options={paymentElementOptions} />
                                                <FormGroup
                                                    sx={{
                                                        position: 'absolute',
                                                        left: '0px',
                                                        top: '100%'
                                                    }}
                                                >
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={checked}
                                                                onChange={handleChange} />
                                                        }
                                                        label="Pagar a la hora de entrega"
                                                    />
                                                </FormGroup>
                                            </Box>
                                            <Button
                                                variant='contained'
                                                onClick={handleSubmit}
                                                disabled={isLoading}
                                                sx={{
                                                    mt: '32px'
                                                }}
                                            >
                                                {
                                                    isLoading ? 'Procesando pago' : 'Pagar ahora'
                                                }
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Box
                                                component='div'
                                                sx={{
                                                    width: '100%',
                                                    py: '8px',
                                                    px: '16px'
                                                }}
                                            >
                                                Contacta con nosotros para seguir los pasos con este método de pago
                                            </Box>
                                            <Button
                                                variant='contained'
                                                onClick={bayByTransferens}
                                            >
                                                {
                                                    'Contactar con nostros'
                                                }
                                            </Button>
                                        </>
                                    )
                            }
                        </>
                        
                    )
            }
        </Box>
    )
}