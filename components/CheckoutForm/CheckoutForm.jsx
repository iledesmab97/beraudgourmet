'use client'

import { useEffect, useState, useMemo } from 'react'
import {CardElement, PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js'
import useGetProducts from '@/hooks/useGetProducts'
import dayjs from 'dayjs'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import styles from './CheckoutForm.module.css'

function registerOrder(data) {
    fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            console.log('The new order has been created successfully')
        })
}

export default function CheckoutForm({user, place, orders, checkout}) {

    const stripe = useStripe()
    const elements = useElements()
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
        applicationDate: dayjs().format('DD/MM/YYYY - HH:mm'),
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

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'http://localhost:3000/success'
            }
        })

        if (error.type === 'card_error' || error.type === 'validation_error') {
            setMessage(error.message)
        } else {
            setMessage('An unexpected error ocurred.')
        }

        registerOrder(dataOrders)

        setIsLoading(false)
    }

    const paymentElementOptions = {
        layout: 'tabs'
    }

    return (
        <Box
            id='payment-form'
            component='form'
            sx={{
                py: '8px',
                px: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
            }}
        >
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
            >
                {
                    isLoading ? 'Procesando pago' : 'Pagar ahora'
                }
            </Button>
        </Box>
    )
}