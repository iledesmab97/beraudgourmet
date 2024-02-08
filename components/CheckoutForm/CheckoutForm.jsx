'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {CardElement, PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js'
import useGetProducts from '@/hooks/useGetProducts'
import dayjs from 'dayjs'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Typography from '@mui/material/Typography'

import styles from './CheckoutForm.module.css'

async function registerOrder(data) {
    fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            console.log('The new order has been created successfully')
            return data
        })
}

export default function CheckoutForm({user, place, orders, checkout, payment_method, handlePaymentMethod}) {

    const stripe = useStripe()
    const elements = useElements()
    const router = useRouter()
    // const { products } = useGetProducts()
    const orderItems = orders.map(item => {
        const { size, mass, quantity, ingredientsModal, extra, totalPrice } = item
        return {
            name: 'pizza',
            itemType: item.name,
            size,
            mass,
            quantity,
            ingredientsOut: ingredientsModal,
            extraIngredients: Object.keys(extra).map(extraIngredient => ({
                name: extraIngredient,
                quantity: extra[extraIngredient]
            })),
            costItemPerUnit: totalPrice,
            totalCostByItem: Number(totalPrice) * quantity
        }
    })
    const dataOrders = {
        userId: user.id,
        storeId: place.closerStore.id,
        totalCostByItems: checkout.totalPriceCar,
        commissions: Number(checkout.IVA) + Number(checkout.commissionStripe),
        totalCost: checkout.totalClient,
        applicationDate: dayjs().format('DD/MM/YYYY - hh:mm a'),
        deliveryDate: place.deadLine.date.realDate + ' - ' + place.deadLine.time.realTime,
        itemsList: orderItems
    }

    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

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

    async function handleSubmit(event) {
        event.preventDefault()

        if (!stripe || !elements) return 
        setIsLoading(true)

        const {paymentIntent, error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // return_url: 'http://localhost:3000/success'
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
                stripeId: paymentIntent.id
            })

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
            <Button
                variant="outlined"
                onClick={() => {handlePaymentMethod('card')}}
                sx={ payment_method !== 'null' ? {
                    position: 'absolute',
                    top: '8px',
                    left: '32px',
                } : {
                    mt: '16px'
                }}
            >
                <PaymentIcon />
                {
                    payment_method === 'null' ?
                        (
                            <Typography
                                sx={{
                                    ml: '8px'
                                }}
                            >
                                Tarjeta de crédito
                            </Typography>
                        ) : null
                }
            </Button>
            <Button
                variant="outlined"
                onClick={() => {handlePaymentMethod('bank')}}
                sx={ payment_method !== 'null' ? {
                    position: 'absolute',
                    top: '8px',
                    left: '110px'
                } : {
                    mt: '16px'
                }}
            >
                <AccountBalanceIcon />
                {
                    payment_method === 'null' ?
                        (
                            <Typography
                                sx={{
                                    ml: '8px'
                                }}
                            >
                                Transferencia bancaria
                            </Typography>
                        ) : null
                }
            </Button>
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
                                                    width: '100%',
                                                    py: '8px',
                                                    px: '16px'
                                                }}
                                            >
                                                <PaymentElement id='payment-element' options={paymentElementOptions} />
                                            </Box>
                                            <Button
                                                variant='contained'
                                                onClick={handleSubmit}
                                                disabled={isLoading}
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
                                                onClick={handleSubmit}
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