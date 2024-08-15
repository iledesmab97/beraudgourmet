import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchDeliveryQuote,
    handleTimeExpirationDeliveryQuote,
} from "@/stores/actions/uberDirect";

export default function useHandleTimerDeliveryQuote() {
    const { inputsHome, closerStore, typeDelivery } = useSelector(
        (state) => state.place
    );
    const { quote, loading, error, timeExpiration } = useSelector(
        (state) => state.uberQuote
    );
    const { timeOut, currentTimer } = timeExpiration;
    const [intervalId, setIntervalID] = useState(null);
    const dispatch = useDispatch();

    // fetch delivery quote
    useEffect(() => {
        if (timeExpiration.loading) return;
        if (!closerStore || !inputsHome) return;
        if (currentTimer && currentTimer.min > 0) return;
        console.log("timeExpiration:", timeExpiration);
        console.log("entre con currentTimer:", currentTimer);
        dispatch(
            fetchDeliveryQuote({
                pickup_address: closerStore.place,
                dropoff_address: inputsHome.inputAddress,
            })
        );
    }, [closerStore, currentTimer]);

    // clear timeInterval
    useEffect(() => {
        if (typeDelivery && typeDelivery.name === "home") return;
        clearInterval(intervalId);
        setIntervalID(null);
        dispatch(handleTimeExpirationDeliveryQuote({ status: "remove" }));
    }, [typeDelivery]);

    // Refresh timeOut
    useEffect(() => {
        if (loading !== false || error) return;
        console.log("entre en el useEffect que hace init");
        // const newTimeOut = timeOutCalculator(10);
        const newTimeOut = 10;
        // const newCurrentTimer = howMuchLeftTime(newTimeOut);
        const newCurrentTimer = { sec: 600, min: 10 };
        dispatch(
            handleTimeExpirationDeliveryQuote({
                timeOut: newTimeOut,
                currentTimer: newCurrentTimer,
                status: "init",
            })
        );
    }, [loading]);

    // turn timeOut on and off
    useEffect(() => {
        if (!timeOut) return;
        function activeClock() {
            // const newCurrentTimer = howMuchLeftTime(timeOut);
            console.log("currentTimer:", currentTimer);
            const newCurrentTimer = {
                sec: currentTimer.sec - 60,
                min: currentTimer.min - 1,
            };
            console.log("newCurrentTimer:", newCurrentTimer);
            if (newCurrentTimer.sec >= 0) {
                dispatch(
                    handleTimeExpirationDeliveryQuote({
                        currentTimer: newCurrentTimer,
                        status: "update",
                    })
                );
            } else {
                clearInterval(intervalId);
                setIntervalID(null);
                dispatch(
                    handleTimeExpirationDeliveryQuote({ status: "remove" })
                );
            }
        }
        console.log("entre");
        const newIntervalId = setInterval(activeClock, 60000);
        setIntervalID(newIntervalId);
        // return () => {
        //     console.log("entre en el return");
        //     clearInterval(newIntervalId);
        //     setIntervalID(null);
        //     dispatch(handleTimeExpirationDeliveryQuote({ status: "remove" }));
        // };
    }, [timeOut]);
}
