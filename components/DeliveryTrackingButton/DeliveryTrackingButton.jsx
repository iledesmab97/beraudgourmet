"use client";

import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import CircleIcon from '@mui/icons-material/Circle';

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getAllOrders } from "@/services/orderApi";
import { getUberDeliveries } from "@/services/uberDirectApi";

function DeliveryTrackingButton() {
    const [ nextUber, setNextUber ] = useState(null)
    const { user } = useSelector(state => state.user)
    const [ubers, setUbers] = useState(0)

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
            setUbers(uberDeliveries.length)

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
                        backgroundColor: "#295386",
                        "&:hover svg": {
                            color: "#295386"
                        }
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
                            }}
                        />
                    </Link>
                    <Box
                        sx={{
                            width: "15px",
                            height: "15px",
                            position: "absolute",
                            top: "0px",
                            left: "40px",
                            color: "white",
                            backgroundColor: "red",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            scale: "1.3"
                        }}

                    >
                        <Typography
                            align="center"
                            sx={{
                                fontSize: "0.6rem",
                                fontWeight: "700"
                            }}
                        >
                            {ubers}
                        </Typography>
                    </Box>
                </Fab>
            )}
        </>
    );
}

export default DeliveryTrackingButton;
