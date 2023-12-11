'use client'

import { useEffect, useState } from 'react'
import {CardElement, PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import styles from './CheckoutForm.module.css'

export default function CheckoutForm() {

    const stripe = useStripe()
    const elements = useElements()

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
                    isLoading ? (
                        <Box component='div' className='spinner' id='spinner'></Box>
                    ) : ('Pagar ahora')}
            </Button>
            {
                message && (
                    <Box id='payment-message'>
                        {message}
                    </Box>
                )
            }
        </Box>
    )
}