import { NextResponse } from "next/server";
import {Stripe} from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export async function POST(req, res) {
    const {amount} = await req.json()
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: 'mxn',
            description: 'pizza de queso',
            automatic_payment_methods: {
                enabled: true
            },
            capture_method: 'manual'
        })
        const {id, status, client_secret} = paymentIntent
        return NextResponse.json({clientSecret: client_secret, id, status})
    } catch(error) {
        return NextResponse.json({message: error.message})
    }
}