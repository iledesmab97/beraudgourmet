import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchDeliveryQuote,
    handleTimeExpirationDeliveryQuote,
} from "@/stores/actions/uberDirect";
import { timeOutCalculator, howMuchLeftTime } from "@/utils/hours";

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
        if (!closerStore || !inputsHome) return;
        if (currentTimer && currentTimer.sec > 0) return;
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
        const newTimeOut = timeOutCalculator(10);
        const newCurrentTimer = howMuchLeftTime(newTimeOut);
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
            const newCurrentTimer = howMuchLeftTime(timeOut);
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
        const newIntervalId = setInterval(activeClock, 60000);
        setIntervalID(newIntervalId);
        return () => {
            clearInterval(newIntervalId);
            setIntervalID(null);
            dispatch(handleTimeExpirationDeliveryQuote({ status: "remove" }));
        };
    }, [timeOut]);
}
