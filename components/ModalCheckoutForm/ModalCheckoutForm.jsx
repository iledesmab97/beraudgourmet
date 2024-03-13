'use client'

import { useEffect, useState, useMemo } from 'react'
import useGetModal from '@/hooks/useGetModal'
import { loadStripe } from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from '@/components/CheckoutForm/CheckoutForm'
import useGetUser from '@/hooks/useGetUser'
import useGetPlace from '@/hooks/useGetPlace'
import useGetOrders from '@/hooks/useGetOrders'
import useGetCheckout from '@/hooks/useGetCheckout'
import {totalPrice} from '@/utils/priceCar'
import { createPaymentRequest, updatePaymentRequest } from '@/services/checkoutApi'
import { descriptionOrder } from '@/utils/preparingData'

import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import DataOrder from '@/components/ModalCheckoutForm/DataOrder'
import DataPrice from '@/components/ModalCheckoutForm/DataPrice'

import styles from './ModalCheckoutForm.module.css'
import dayjs from 'dayjs'

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`, {
    locale: 'es-419'
})

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    height: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
}

function ModalCheckoutForm() {

    const { open, handleCloseModal } = useGetModal({modalType: 'pay'})
    const {user} = useGetUser()
    const {place} = useGetPlace()
    const {orders} = useGetOrders()
    const {checkout} = useGetCheckout()
    const [messageDelivery, setMessageDelivery] = useState('')
    const [preMessageDelivery, setPreMessageDelivery] = useState('')

    const [clientSecret, setClientSecret] = useState('')
    const [dataStripe, setDataStripe] = useState(null)
    const [payment_method, setPayment_metod] = useState('null')
    const orderDescription = useMemo(() => {
        return orders.map(order => descriptionOrder(order)).join("; ")
    }, [orders])

    useEffect(() => {
        if (!place.deadLine) return
        let newMessageDeliver
        let newPreMessageDelivery
        if (dayjs().isSame(dayjs(place.deadLine.date.realDate, 'D/M/YYYY'), 'day')) {
            newMessageDeliver = `${place.deadLine.time.realTime} (${place.deadLine.time.relativeTime})`
            newPreMessageDelivery = 'Se espera a las:'
        } else {
            newMessageDeliver = `${place.deadLine.date.relativeDate.split(", ")[1]} a las ${place.deadLine.time.realTime}`
            newPreMessageDelivery = 'Se espera el:'
        }
        setMessageDelivery(newMessageDeliver)
        setPreMessageDelivery(newPreMessageDelivery)
    }, [place])

    useEffect(() => {
        if (!orders.length) return
        if (!dataStripe) {
            const {totalClient} = totalPrice(orders)
            createPaymentRequest({userId: user.id, email: user.email, amount: totalClient, description: orderDescription, payInPlace: false})
                .then(data => {
                    if (data.clientSecret) {
                        const { clientSecret, id, status } = data
                        setClientSecret(data.clientSecret)
                        setDataStripe({clientSecret, id, status})
                    }
                    else console.log('Error:', data.message)
                })
        } else {
            const {totalClient} = totalPrice(orders)
            updatePaymentRequest({amount: totalClient, description: orderDescription, stripeId: dataStripe.id, payInPlace: false})
                .then(data => {
                    if (data.clientSecret) {
                        const { clientSecret, id, status } = data
                        setClientSecret(data.clientSecret)
                        setDataStripe({clientSecret, id, status})
                    }
                    else console.log('Error:', data.message)
                })
        }
    }, [orders])

    const appearance = {
        theme: 'stripe'
    }

    const options = {
        clientSecret,
        appearance
    }

    function handleDataStripe(value) {
        setDataStripe(value)
    }

    function handlePaymentMethod(paymethod) {
        setPayment_metod(paymethod)
    }

    return (
        <Modal
            open={open}
            onClose={() => { handleCloseModal('pay') }}
        >
            <Grid
                container
                sx={style}
                alignItems={'stretch'}
            >
                <Typography
                    variant='title'
                    gutterBottom
                >
                    { place.typeDelivery && place.typeDelivery.totalName }
                </Typography>
                <Box
                    sx={{
                        height: '90%',
                        width: '100%',
                        overflowY: 'scroll',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '16px',
                        pr: '8px',
                        boxSizing: 'border-box'
                    }}
                >
                    <DataOrder
                        user={user}
                        place={place}
                        preMessageDelivery={preMessageDelivery}
                        messageDelivery={messageDelivery}
                    />
                    <DataPrice
                        orders={orders}
                        payment_method={payment_method}
                        checkout={checkout}
                    />
                    <Typography
                        variant='title'
                        gutterBottom
                        sx={{
                            alignSelf: 'center'
                        }}
                    >
                        {
                            payment_method === 'null' ?
                                "Pago" : (
                                    payment_method === 'card' ?
                                        (
                                            "Pago por Tarjeta de Crédito"
                                        ) : (
                                            "Pago por Transferencia Bancaria"
                                        )
                                )
                        }
                    </Typography>
                    <Grid
                        item
                        sx={{
                            width: '100%',
                            borderRadius: '8px',
                            py: '8px'
                        }}
                    >
                        {
                            clientSecret && (
                                <Elements options={options} stripe={stripePromise} >
                                    <CheckoutForm
                                        user={user}
                                        place={place}
                                        orders={orders}
                                        checkout={checkout}
                                        payment_method={payment_method}
                                        dataStripe={dataStripe}
                                        handlePaymentMethod={handlePaymentMethod}
                                        handleCloseModal={handleCloseModal}
                                        handleDataStripe={handleDataStripe}
                                    />
                                </Elements>
                            )
                        }
                    </Grid>
                </Box>                
            </Grid>
        </Modal> 
    )
}

export default ModalCheckoutForm