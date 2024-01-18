const { Stripe } = require('stripe')

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

const controllerCheckout = {
    requestPayment: async function(req, res) {
        const { amount, userId, email, description } = req.body
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(amount * 100),
                currency: 'mxn',
                description,
                automatic_payment_methods: {
                    enabled: true
                },
                capture_method: 'manual',
                // customer: userId,
                receipt_email: email
            })
            const {id, status, client_secret} = paymentIntent
            return res.status(200).json({clientSecret: client_secret, id, status})
        } catch(error) {
            return res.status(400).json({message: error.message})
        }
    }
}

module.exports = controllerCheckout