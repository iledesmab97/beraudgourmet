import { NextResponse } from "next/server";
import {Stripe} from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export async function POST(req, res) {
    const {amount} = await req.json()
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true
            }
        })
        return NextResponse.json({clientSecret: paymentIntent.client_secret})
    } catch(error) {
        return NextResponse.json({message: error.message})
    }
}