"use client";

import Fab from "@mui/material/Fab";
import Link from "@mui/material/Link";

import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getAllOrders } from "@/services/orderApi";
import { getUberDeliveries } from "@/services/uberDirectApi";

function DeliveryTrackingButton() {
    const [ nextUber, setNextUber ] = useState(null)
    const { user } = useSelector(state => state.user)

    useEffect(() => {
        if (!user) {
            return setNextUber(null)
        }
        getNextOrderToBeDelivered({ userId: user.id })
    }, [user])

    async function getNextOrderToBeDelivered({ userId }) {
        try {
            const { orders: totalOrders } = await getAllOrders({
                userId,
                queries: {
                    page: 0,
                    closed: false,
                    delivery: true,
                }
            })
            const ordersId = totalOrders.map(item => item.id) 
            const uberDeliveries = await getUberDeliveries({
                ordersId,
                relation: "order",
                order: "dropoff_deadline:ASC"
            })

            if (!uberDeliveries[0]) return
            setNextUber(uberDeliveries[0])

        } catch(error) {
            alert(error.message)
        } 
    }

    return (
        <>
            { !user || !nextUber ? null : (
                <Fab
                    sx={{
                        position: "fixed",
                        bottom: "90px",
                        right: "20px",
                        // backgroundColor: "#25D366",
                        backgroundColor: "#295386",
                    }}
                >
                    <Link
                        href={nextUber.tracking_url}
                        target="_blank"
                        sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <DeliveryDiningIcon
                            sx={{
                                scale: "1.5",
                                color: "white",
                                "&:hover": {
                                    color: "#295386"
                                }
                            }}
                        />
                    </Link>
                </Fab>
            )}
        </>
    );
}

export default DeliveryTrackingButton;
