import { NextResponse } from "next/server";
import {Stripe} from 'stripe'

// export default function handler(req, res) {
//     if (req.method === 'POST') {
//         return res.status(200).json({ message: 'Hello from Next.js!' })
//     } else {
//         return res.status(200).json({ message: 'checkout' })
//     }
// }

export async function POST(req) {
    const {id} = await req.json()
    console.log('id:', id)
    try {
        const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`)
        // await stripe.checkout.sessions.create({
        //     mode: 'payment',
        //     payment_method_types: ['card'],
        //     line_items: [
        //         {
        //             price: id,
        //             quantity: 1,
    
        //         }
        //     ]
        // })
        console.log('me pude comunicar con Stripe exitosamente')
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000,
            currency: 'usd',
            // description: 'pizza',
            payment_method: id,
            // confirm: true,
            // success_url: 'http://localhost:3000/success',
            // // automatic_payment_methods: true
            // cancel_url: 'http://localhost:3000/menu'
        })
        console.log('session:', paymentIntent)
        return NextResponse.json({message: 'Successful payment'})
    } catch(error) {
        console.log('algo salió mal y me vine al catch')
        return NextResponse.json({message: error.message})
    }
}

// import Stripe from "stripe";

// const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
    //   const params = {
    //     submit_type: "pay",
    //     mode: "payment",
    //     payment_method_types: ["card"],
    //     shipping_options: [{ shipping_rate: "shr_1L1dyAGZPNhQILapjt3TKYzy" }],
    //     line_items: req.body.map((item) => {
    //       return {
    //         price_data: {
    //           currency: "eur",
    //           product_data: {
    //             name: item.title,
    //             images: [item.image.secure_url],
    //           },
    //           unit_amount: item.price * 100,
    //         },
    //         adjustable_quantity: {
    //           enabled: true,
    //           minimum: 1,
    //         },
    //         quantity: item.quantity,
    //       };
    //     }),
    //     success_url: `${req.headers.origin}/success`,
    //     cancel_url: `${req.headers.origin}/cancel`,
    //   };

//       const session = await stripe.checkout.sessions.create(params);

//       res.status(200).json(session);
//     } catch (err) {
//       res.status(err.statusCode || 500).json(err.message);
//     }
//   } else {
//     res.setHeader("Allow", "POST");
//     res.status(405).end("Method Not Allowed");
//   }
// }