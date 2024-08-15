import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveryQuote } from "@/stores/actions/uberDirect";

export default function useHandleTimerDeliveryQuote() {
    const { inputsHome, closerStore, typeDelivery } = useSelector(
        (state) => state.place
    );
    const { loading, error } = useSelector((state) => state.uberQuote);
    const [intervalId, setIntervalID] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (typeDelivery && typeDelivery.name === "store") {
            clearInterval(intervalId);
            localStorage.removeItem("countdownTimer");
            setIntervalID(null);
            return;
        }

        if (error) {
            clearInterval(intervalId);
            setIntervalID(null);
            return;
        }

        if (!closerStore || !inputsHome) return;

        if (loading) {
            clearInterval(intervalId);
            //localStorage.removeItem("countdownTimer");
            return;
        }

        const startCountdownTimer = () => {
            let duration;

            if (localStorage.getItem("countdownTimer")) {
                const currentDate = Math.round(Date.now() / 1000);
                const expirationDate = Number(
                    localStorage.getItem("expirationDate")
                );
                if (expirationDate > currentDate) {
                    duration = Math.round(expirationDate - currentDate);
                } else {
                    duration = 0;
                }
            } else {
                duration = 10 * 60;
                localStorage.setItem("countdownTimer", "10:00"); // Set the initial timer value
            }

            const updateTimerInLocalStorage = () => {
                if (duration <= 0) {
                    localStorage.removeItem("countdownTimer");
                    clearInterval(intervalId);
                    setIntervalID(null);
                    console.log("Time's up! Refreshing the delivery quote...");
                    dispatch(
                        fetchDeliveryQuote({
                            pickup_address: closerStore.place,
                            dropoff_address: inputsHome.inputAddress,
                        })
                    );
                    return;
                } else if (duration === 600) {
                    localStorage.setItem(
                        "expirationDate",
                        Math.round(Date.now() / 1000) + duration
                    );
                    duration--;
                    dispatch(
                        fetchDeliveryQuote({
                            pickup_address: closerStore.place,
                            dropoff_address: inputsHome.inputAddress,
                        })
                    );
                }

                const minutes = Math.floor(duration / 60);
                const seconds = duration % 60;

                const formattedTime = `${minutes
                    .toString()
                    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

                localStorage.setItem("countdownTimer", formattedTime);

                duration--;
            };

            if (intervalId) {
                clearInterval(intervalId); // Clear any existing interval
            }

            const newIntervalId = setInterval(updateTimerInLocalStorage, 1000);
            setIntervalID(newIntervalId);
        };

        startCountdownTimer();

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
                setIntervalID(null);
            }
        };
    }, [loading, closerStore, dispatch, inputsHome, error, typeDelivery]);
}
