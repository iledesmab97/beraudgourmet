'use client'

import { useEffect, useState } from 'react'
import useGetModal from '@/hooks/useGetModal'
import { loadStripe } from '@stripe/stripe-js'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import useGetUser from '@/hooks/useGetUser'
import useGetPlace from '@/hooks/useGetPlace'
import useGetOrders from '@/hooks/useGetOrders'

import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import styles from './ModalCheckoutForm.module.css'
import dayjs from 'dayjs'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'flex-start',
    justifyContent: 'space-between',
    gap: 2,
}

function ModalCheckoutForm() {

    const { open, handleCloseModal } = useGetModal({modalType: 'pay'})
    const {user} = useGetUser()
    const {place} = useGetPlace()
    const {orders} = useGetOrders()
    const [stripeSecret, setStripeSecret] = useState(null)
    const stripe = useStripe()
    const elements = useElements()
    const [messageDelivery, setMessageDelivery] = useState('')

    useEffect(() => {
        if (!place.deadLine) return
        let newMessageDeliver
        if (dayjs().isSame(dayjs(place.deadLine.date.realDate, 'D/M/YYYY'), 'day')) {
            newMessageDeliver = `Se espera a las: ${place.deadLine.time.realTime} (${place.deadLine.time.relativeTime})`
        } else {
            newMessageDeliver = `Se espera el: ${place.deadLine.date.relativeDate.split(", ")[1]} a las ${place.deadLine.time.realTime}`
        }
        setMessageDelivery(newMessageDeliver)
    }, [place])

    // useEffect(() => {
    //     loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`)
    //         .then(data => {
    //             console.log('data:', data)
    //             setStripeSecret(data)
    //         })
    // },[])

    async function handleSubmit(event) {
        event.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })
        if (!error) {
            // console.log('paymentMethod:', paymentMethod)
            const {id} = paymentMethod
            const res = await fetch('/api/checkout', {
                method: 'POST',
                body: JSON.stringify({
                    id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            // console.log('data:', data)
            if (data.message === 'Successful payment') window.location.href = 'http://localhost:3000/success'
            // const payment = await stripeSecret.paymentIntents.create({
            //     amount: 5 * 100,
            //     currency: 'USD',
            //     description: 'Pizza',
            //     confirm: true
            // })
            // console.log('payment:', payment)
            // console.log('pago exitoso')
        }
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
                <Grid
                    container
                    item
                    spacing={2}
                    direction={'column'}
                    alignItems={'center'}
                >
                    <Grid
                        container
                        item
                        direction={'column'}
                        alignItems={'stretch'}
                        
                        spacing={1}
                    >
                        <Grid item>
                            <Typography
                                variant='p'
                                gutterBottom
                            >
                                Para: {user.name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant='p'
                                gutterBottom
                            >
                                De: {place.closerStore && place.closerStore.name}
                            </Typography>
                        </Grid>
                        {
                            place.typeDelivery && place.typeDelivery.name  === 'home' ?
                            (
                                <Grid item>    
                                    <Typography
                                        variant='p'
                                        gutterBottom
                                    >
                                        Dirección: {`${place.inputsHome.street.unity}/${place.inputsHome.street.number} ${place.inputsHome.street.streetName}, ${place.inputsHome.inputAddress.split(",")[0]}`}
                                    </Typography>
                                </Grid>
                            ) : (
                                null
                            )
                        }
                        <Grid item>
                            <Typography
                                variant='p'
                                gutterBottom
                            >
                                {messageDelivery}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography
                        variant='p'
                        gutterBottom
                        sx={{
                            alignSelf: 'center'
                        }}
                    >
                        Pago
                    </Typography>
                    <Grid
                        item
                        sx={{
                            width: '100%',
                            bgcolor: '#EAEDF2',
                        }}
                    >
                        {/* <Typography
                            variant='title'
                            gutterBottom
                        >
                            Su cuenta
                        </Typography> */}
                        <Box
                            component='form'
                            sx={{
                                py: '8px',
                                px: '16px'
                            }}
                            // onSubmit={handleSubmit}
                        >
                            <CardElement
                                className={`MuiInputBase-input MuiOutlinedInput-input mui-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input ${styles.CardInput}`}
                            />
                            <TextField
                                variant='outlined'
                                fullWidth
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Button
                    variant='contained'
                    onClick={handleSubmit}
                >
                    Pagar
                </Button>
                    {/* <PaymentElement />
                    <Button>Enviar Pago</Button> */}
                
            </Grid>
        </Modal> 
    )
}

export default ModalCheckoutForm