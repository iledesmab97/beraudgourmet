const { Router } = require('express')
const { Stripe } = require('stripe')

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

const router = Router()

router.post('/', async (req, res) => {
    const { amount } = req.body
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
        return res.json({clientSecret: client_secret, id, status})
    } catch(error) {
        return res.json({message: error.message})
    }
})

module.exports = router