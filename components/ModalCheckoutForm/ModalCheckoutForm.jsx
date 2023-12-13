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
import {totalPrice} from '@/genericFunctions/priceCar'

import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'

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
    width: 500,
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
        const {totalClient} = totalPrice(orders)
        fetch('api/checkout', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: totalClient })
        })
            .then(res => res.json())
            .then(data => {
                if (data.clientSecret) setClientSecret(data.clientSecret)
                else console.log('Error:', data.message)
            })
    }, [orders])

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
                <Box
                    sx={{
                        height: '90%',
                        width: '100%',
                        overflow: 'scroll',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '16px',
                        pr: '8px',
                        boxSizing: 'border-box'
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <Box
                            className={styles.CheckoutFormInvoiceData}
                        >
                            <Typography
                                variant='p'
                                gutterBottom
                            >
                                Para:
                            </Typography>
                            <Typography
                                variant='p'
                                gutterBottom
                            >
                                {user.name}
                            </Typography>
                        </Box>
                        <Box
                            className={styles.CheckoutFormInvoiceData}
                        >
                            <Typography
                                variant='p'
                                gutterBottom
                            >
                                De:
                            </Typography>
                            <Typography
                                variant='p'
                                gutterBottom
                            >
                                {place.closerStore && place.closerStore.name}
                            </Typography>
                        </Box>
                        {
                            place.typeDelivery && place.typeDelivery.name  === 'home' ?
                            (
                                <Box
                                    className={styles.CheckoutFormInvoiceData}
                                >    
                                    <Typography
                                        variant='p'
                                        gutterBottom
                                    >
                                        Dirección:
                                    </Typography>
                                    <Typography
                                        variant='p'
                                        gutterBottom
                                    >
                                        {`${place.inputsHome.street.unity}/${place.inputsHome.street.number} ${place.inputsHome.street.streetName}, ${place.inputsHome.inputAddress.split(",")[0]}`}
                                    </Typography>
                                </Box>
                            ) : (
                                null
                            )
                        }
                        <Box
                            className={styles.CheckoutFormInvoiceData}
                        >
                            <Typography
                                variant='p'
                                gutterBottom
                            >
                                {preMessageDelivery}
                            </Typography>
                            <Typography
                                variant='p'
                                gutterBottom
                            >
                                {messageDelivery}
                            </Typography>
                        </Box>
                    </Box>
                    <Grid
                        sx={{
                            width: '100%'
                        }}
                    >

                        {
                            orders && orders.length && (
                                <>
                                    {orders.map((order, index) => (
                                        <Box key={order.name + order.totalPrice + ' ' + index}>
                                            <Divider />
                                            <ListItem
                                                sx={{
                                                    px: '0px'
                                                }}
                                            >
                                                <ListItemText
                                                    primary={
                                                    <Box
                                                        component={'div'}
                                                        sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between'
                                                        }}
                                                    >
                                                        { order.quantity + ' x ' + order.name + ` (${order.size})`}
                                                        <Typography>
                                                            ${order.totalPrice}
                                                        </Typography>
                                                    </Box>
                                                    }
                                                    secondary={
                                                    <>
                                                        {`${order.mass}${Object.keys(order.extra).map(ingredient => {
                                                        return `, ${order.extra[ingredient]}x ${ingredient}`
                                                        }).join('')
                                                        }`}
                                                        {
                                                        order.ingredientsModal.map((ingredient, index) => (
                                                            <Box key={ingredient + index} component={'label'}>, <CrossTet component={'span'}>{ingredient}</CrossTet></Box>
                                                        ))
                                                        }
                                                    </>
                                                    }
                                                />
                                            </ListItem>
                                            <Divider />
                                        </Box>
                                    ) )}
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
                                </>
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
                        variant='title'
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
                            borderRadius: '8px',
                            py: '8px'
                        }}
                    >
                        {
                            clientSecret && (
                                <Elements options={options} stripe={stripePromise} >
                                    <CheckoutForm />
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