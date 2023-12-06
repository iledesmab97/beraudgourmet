'use client'

import { useState, useEffect } from 'react'
import {Stripe} from 'stripe'

import Button from '@mui/material/Button'

function ButtonPay() {

    const [stripe, setStripe] = useState(null)

    // useEffect(() => {
    //     // const newStripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    //     const newStripe = new Stripe('sk_test_51OIZNTCMhwExfY9djLejwgt1FUOqhk8qQm3Qjp6cHIKGMw6v8O04pJSilxbeZ4oQxVNUKjxc0WXS6efL51u6brza006TLHXdCV')
    //     setStripe(newStripe)
    // }, [])

    async function makePay() {
        // const session = await stripe.checkout.sessions.create({
        //     mode: 'payment',
        //     payment_method_types: ['card'],
        //     line_items: [
        //         {
        //             price: 50,
        //             quantity: 1
        //         }
        //     ],
        //     success_url: 'http://localhost:3000',
        //     cancel_url: 'http://localhost:3000/menu'
        // })
        // console.log('session:', session)
    }

    return (
        <Button
            variant='contained'
            color='secondary'
            sx={{ my:1 }}
            fullWidth
            onClick={() => {
                console.log('estoy pagando')
                makePay()
            }}
        >Pagar</Button>
    )
}

export default ButtonPay