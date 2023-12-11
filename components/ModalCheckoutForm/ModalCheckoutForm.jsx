'use client'

import { useEffect, useState } from 'react'
import useGetModal from '@/hooks/useGetModal'
import { loadStripe } from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from '@/components/CheckoutForm/CheckoutForm'
import useGetUser from '@/hooks/useGetUser'
import useGetPlace from '@/hooks/useGetPlace'
import useGetOrders from '@/hooks/useGetOrders'
import useGetCheckout from '@/hooks/useGetCheckout'
import useTotalPrice from '@/hooks/useTotalPrice'

import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

import styles from './ModalCheckoutForm.module.css'
import dayjs from 'dayjs'

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`)

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
    // const {totalPrice} = useTotalPrice()
    const {checkout} = useGetCheckout()
    const [messageDelivery, setMessageDelivery] = useState('')

    const [clientSecret, setClientSecret] = useState('')

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

    useEffect(() => {
        if (!open || !orders.length) return
        fetch('api/checkout', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            // body: JSON.stringify({ items: [{ id: "xl-tshirt" }] })
            body: JSON.stringify({ amount: checkout.totalClient })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret))
    }, [open])

    const appearance = {
        theme: 'stripe'
    }

    const options = {
        clientSecret,
        appearance
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
                    <Grid
                        sx={{
                            width: '100%'
                        }}
                    >

                        {
                            orders && orders.length && (
                                <List>
                                    <ListItem
                                        sx={{
                                            pr: '0px',
                                            pl: '0px',
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <Typography>
                                            Total Carrito: 
                                        </Typography>
                                        <Typography>
                                            ${checkout.totalPriceCar}
                                        </Typography>
                                    </ListItem>
                                    <ListItem
                                        sx={{
                                            pr: '0px',
                                            pl: '0px',
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <Typography>
                                            Total IVA Stripe:
                                        </Typography>
                                        <Typography>
                                            ${checkout.commissionStripe}
                                        </Typography>
                                    </ListItem>
                                    <ListItem
                                        sx={{
                                            pr: '0px',
                                            pl: '0px',
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <Typography>
                                            Total IVA:
                                        </Typography>
                                        <Typography>
                                            ${checkout.IVA}
                                        </Typography>
                                    </ListItem>
                                </List>
                            )
                        }
                        <Box
                            sx={{
                                pr: '0px',
                                pl: '0px',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >    
                            <Typography variant='title'>
                                Total
                            </Typography>
                            <Typography variant='button' display='block' gutterBottom>
                                ${checkout.totalClient}
                            </Typography>
                        </Box>
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
                        <Typography
                            variant='title'
                            gutterBottom
                        >
                            Su cuenta
                        </Typography>
                        {
                            clientSecret && (
                                <Elements options={options} stripe={stripePromise} >
                                    <CheckoutForm />
                                </Elements>
                            )
                        }
                    </Grid>
                </Grid>                
            </Grid>
        </Modal> 
    )
}

export default ModalCheckoutForm