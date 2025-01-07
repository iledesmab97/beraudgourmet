"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

import useLocalData from "@/hooks/useLocalData";
import useGetAlertDialogMessage from "@/hooks/useGetAlertDialogMessage";

import dayjs from "dayjs";
import { contactUs } from "@/utils/contact";
import { descriptionOrder } from "@/utils/preparingData";
import { updatePaymentRequest } from "@/services/checkoutApi";
import { registerOrder, updateOrder } from "@/services/orderApi";
import { getPizzaIngredients, getSaladIngredients } from "@/services/productApi";
import { mapDeliveryInformationToBackend } from "@/utils/mappers";
import { dateStringToDate } from "@/utils/hours";

import styles from "./CheckoutForm.module.css";

const wrappersType = {
    "30cm": "S",
    "60cm": "M",
    "90cm": "L",
}

export default function CheckoutForm({
    user,
    place,
    orders,
    checkout,
    quote,
    payment_method,
    dataStripe,
    handlePaymentMethod,
    handleCloseModal,
    handleDataStripe,
}) {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
    const firstTime = useRef(true);
    const { removeLocalData } = useLocalData();
    const { openAlertDialogMessage } = useGetAlertDialogMessage({
        type: "phoneMissing",
    });
    const pathname = usePathname()

    const textOrderToWhatsapp = orders
        .map((order) => descriptionOrder(order))
        .join("; ");

    const orderItems = orders.map((item) => {
        const {
            size,
            mass,
            quantity,
            ingredientsModal,
            extra,
            totalPrice,
            productType,
        } = item;
        return {
            name: item.name,
            itemType: productType,
            size,
            mass,
            wrapper: wrappersType[size],
            quantity,
            ingredientsOut: ingredientsModal,
            extraIngredients: Object.keys(extra).map((extraIngredient) => ({
                name: extraIngredient,
                quantity: extra[extraIngredient],
            })),
            costItemPerUnit: totalPrice / quantity,
            totalCostByItem: Number(totalPrice),
            description: descriptionOrder(item, item.productType),
        };
    });
    const dataOrders = {
        userId: user.id,
        storeId: place.closerStore.id,
        totalCostByItems: checkout.totalPriceCar,
        commissions: Number(checkout.commissionStripe) + (quote ? quote.fee.feeIVAStripe : 0),
        totalCost: Number(checkout.totalClient) + (quote ? quote.fee.feeIVAStripe : 0),
        applicationDate: dayjs().toISOString(),
        deliveryDate: dateStringToDate({ dateString: place.deadLine.date.realDate + " - " + place.deadLine.time.realTime, format: "YYYY/MM/DD - HH:mm"}).toISOString(),
        delivery: place.inputsHome ? true : false,
        itemsList: orderItems,
        deliveryInformation: place.inputsHome ? mapDeliveryInformationToBackend({ ...place.inputsHome, ...quote }) : null
    };
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openTooltip, setOpenTooltip] = useState({
        card: false,
        bank: false,
    });
    const [checked, setChecked] = useState(false);

    function handleOpenTooltip(paymentMethod) {
        setOpenTooltip((prevState) => ({
            ...prevState,
            [paymentMethod]: true,
        }));
    }

    function handleCloseTootip(paymentMethod) {
        setOpenTooltip((prevState) => ({
            ...prevState,
            [paymentMethod]: false,
        }));
    }

    useEffect(() => {
        if (!stripe) return;

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) return;

        const paymentIntent = async () => {
            await stripe.retrievePaymentIntent(clientSecret);
        };
        paymentIntent();
    }, [stripe]);

    useEffect(() => {
        return () => {
            if (firstTime.current) {
                firstTime.current = false;
            } else {
                handleCloseModal("pay");
            }
        };
    }, []);

    useEffect(() => {
        const updatePayment = async () => {
            try {
                const data = await updatePaymentRequest({
                    payInPlace: checked,
                    stripeId: dataStripe.id,
                });

                if (data.clientSecret) {
                    const { clientSecret, id, status } = data;
                    handleDataStripe({ clientSecret, id, status });
                } else {
                    console.log("Error:", data.message);
                    throw new Error(`Error: ${data.message}`)
                }
            } catch (error) {
                console.log("Error:", error);
                alert(error.message)
            }
        };

        updatePayment();
    }, [checked]);

    async function handleSubmit(event) {
        event.preventDefault();

        // Confirmar los datos del usuario
        if (!user.numberPhone) {
            return openAlertDialogMessage();
        }

        try {
            const { name, value } = await checkIngredientsAvailable(orderItems)
            if (!value) throw new Error(`Lo sentimos, el ingrediente "${name}" acaba de agortarse`)

            if (!stripe || !elements) return;
            setIsLoading(true);

            const response = await registerOrder({
                ...dataOrders,
                paymentMethod: "stripe",
                paid: !checked,
            });
            if (response.message) {
                throw new Error(`Error al crear la orden: ${response.message}`)
            }
    
            const { paymentIntent, error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    // return_url: 'http://localhost:3000/success',
                    // capture_method: 'manual'
                },
                redirect: "if_required",
            });
    
            if (error) {
                if (
                    error.type === "card_error" ||
                    error.type === "validation_error"
                ) {
                    throw new Error(`Error al realizar el pago: ${error.message}`)
                } else {
                    throw new Error(`Error inesperado al realizar el pago: ${error.message}`)
                }
            } else {
                const updateResponse = await updateOrder(response.id, {
                    StripeId: paymentIntent.id,
                })
                if (updateResponse.message) {
                    throw new Error(`Error al actualizar la orden: ${updateResponse.message}`)
                }
                setIsLoading(true);
                removeLocalData("orders");
                removeLocalData("place");
    
                return router.push(`${pathname}/success`);
            } 
                
        } catch(error) {
            alert(error.message)
        } finally {
            setIsLoading(false);
            setError("Algo salió mal");
        }
    }

    const paymentElementOptions = {
        layout: "tabs",
        // layout: 'accordion'
    };

    function handleChange() {
        setChecked((prev) => !prev);
    }

    async function bayByTransferens() {
        await registerOrder({
            ...dataOrders,
            paymentMethod: "transfer",
            paid: false,
        });
        removeLocalData("orders");
        removeLocalData("place");
        contactUs({
            context: "transfer",
            name: user.name,
            order: textOrderToWhatsapp,
        });
        handleCloseModal("pay");
        return router.push("/success");
    }

    async function checkIngredientsAvailable(orderItems) {
        for (let item of orderItems) {
            const { itemType, name } = item
            let ingredients
            switch (itemType) {
                case "pizza": {
                    ingredients = await getPizzaIngredients({ name })
                    break
                }
                case "salad": {
                    ingredients = await getSaladIngredients({ name })
                    break
                }
            }
            let missingIngredient
            const allIngredientesAvailable = ingredients.every(({ quantity, count , name }) => {
                if (quantity <= count) return true
                missingIngredient = name
                return false
            })
            if (!allIngredientesAvailable) {
                const response = {
                    name: missingIngredient,
                    value: false
                }
                return response
            }
        }
        return { value: true }
    }

    return (
        <Box
            id="payment-form"
            component="form"
            sx={{
                py: "8px",
                pt: payment_method === "null" ? "8px" : "45px",
                px: "16px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
            }}
        >
            <Box
                variant="outlined"
                onClick={() => {
                    handlePaymentMethod("card");
                }}
                className={
                    payment_method === "null"
                        ? styles.buttonPaymentMethodToSelect
                        : `${styles.buttonPaymentMethodSelected} ${
                              styles.card
                          } ${
                              payment_method === "card"
                                  ? styles.paymentMethodSelected
                                  : ""
                          }`
                }
            >
                <Tooltip
                    title={<Typography>Targeta de crédito</Typography>}
                    open={payment_method !== "null" && openTooltip.card}
                    onOpen={() => {
                        handleOpenTooltip("card");
                    }}
                    onClose={() => {
                        handleCloseTootip("card");
                    }}
                >
                    <PaymentIcon
                        className={styles.iconButtonPaymentMethodToSelect}
                    />
                </Tooltip>
                {payment_method === "null" ? (
                    <Box className={styles.textButtonPaymentMethodToSelect}>
                        <Typography>
                            {"Tarjeta de crédito".toUpperCase()}
                        </Typography>
                    </Box>
                ) : null}
            </Box>
            <Box
                variant="outlined"
                onClick={() => {
                    handlePaymentMethod("bank");
                }}
                className={
                    payment_method === "null"
                        ? styles.buttonPaymentMethodToSelect
                        : `${styles.buttonPaymentMethodSelected} ${
                              styles.bank
                          } ${
                              payment_method === "bank"
                                  ? styles.paymentMethodSelected
                                  : ""
                          }`
                }
            >
                <Tooltip
                    title={<Typography>Transferencia bancaria</Typography>}
                    open={payment_method !== "null" && openTooltip.bank}
                    onOpen={() => {
                        handleOpenTooltip("bank");
                    }}
                    onClose={() => {
                        handleCloseTootip("bank");
                    }}
                >
                    <AccountBalanceIcon />
                </Tooltip>
                {payment_method === "null" ? (
                    <Box className={styles.textButtonPaymentMethodToSelect}>
                        <Typography>
                            {"Transferencia bancaria".toUpperCase()}
                        </Typography>
                    </Box>
                ) : null}
            </Box>
            {payment_method === "null" ? null : (
                <>
                    {payment_method === "card" ? (
                        <>
                            <Box
                                component="div"
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    py: "8px",
                                    px: "16px",
                                }}
                            >
                                <PaymentElement
                                    id="payment-element"
                                    options={paymentElementOptions}
                                />
                                <FormGroup
                                    sx={{
                                        position: "absolute",
                                        left: "0px",
                                        top: "100%",
                                    }}
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checked}
                                                onChange={handleChange}
                                            />
                                        }
                                        label="Pagar a la hora de entrega"
                                    />
                                </FormGroup>
                            </Box>
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={isLoading}
                                sx={{
                                    mt: "32px",
                                }}
                            >
                                {isLoading ? "Procesando pago" : "Pagar ahora"}
                            </Button>
                            {error ? <p>{error}</p> : <></>}
                        </>
                    ) : (
                        <>
                            <Box
                                component="div"
                                sx={{
                                    width: "100%",
                                    py: "8px",
                                    px: "16px",
                                }}
                            >
                                Contacta con nosotros para seguir los pasos con
                                este método de pago
                            </Box>
                            <Button
                                variant="contained"
                                onClick={bayByTransferens}
                            >
                                {"Contactar con nostros"}
                            </Button>
                        </>
                    )}
                </>
            )}
        </Box>
    );
}
