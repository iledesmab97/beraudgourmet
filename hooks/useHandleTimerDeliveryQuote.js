import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveryQuote } from "@/stores/actions/uberDirect";

export default function useHandleTimerDeliveryQuote() {
    const { quote, loading, error } = useSelector((state) => state.uberQuote);
    const [timer, setTimer] = useState(null);
    const { inputsHome, closerStore } = useSelector((state) => state.place);
    const intervalId = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (loading) {
            clearInterval(intervalId.current);
            localStorage.removeItem("countdownTimer");
            localStorage.removeItem("expirationDate");
            return;
        }

        if (error) {
            clearInterval(intervalId.current);
            intervalId.current = null;
            localStorage.removeItem("countdownTimer");
            localStorage.removeItem("expirationDate");
            return;
        }

        startCountdownTimer();

        return () => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
                intervalId.current = null;
            }
        };
    }, []);

    function refreshQuote() {
        clearInterval(intervalId.current);
        intervalId.current = null;
        localStorage.removeItem("countdownTimer");
        localStorage.removeItem("expirationDate");
        localStorage.removeItem("quote");
        setTimer("10:00");
        startCountdownTimer();
        return;
    }

    function getDuration() {
        let duration;
        if (!localStorage.getItem("countdownTimer")) {
            duration = 600;
            localStorage.setItem("countdownTimer", "10:00");
            const currentDate = Math.round(Date.now() / 1000);
            const expirationDate = currentDate + 600;
            localStorage.setItem("expirationDate", expirationDate);
        } else {
            const expirationDate = Number(
                localStorage.getItem("expirationDate")
            );
            duration = expirationDate - Math.round(Date.now() / 1000);
        }
        return duration;
    }

    function updateTimerInLocalStorage(duration) {
        if (duration <= 0) {
            return refreshQuote();
        } else if (duration === 600) {
            dispatch(
                fetchDeliveryQuote({
                    pickup_address: closerStore.place,
                    dropoff_address: inputsHome.inputAddress,
                })
            );
        }

        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;

        const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;

        localStorage.setItem("countdownTimer", formattedTime);
        setTimer(formattedTime);
    }

    const startCountdownTimer = () => {
        let duration = getDuration();

        if (intervalId.current) {
            clearInterval(intervalId.current); // Clear any existing interval
        }

        const newIntervalId = setInterval(() => {
            updateTimerInLocalStorage(duration);
            duration--;
        }, 1000);
        intervalId.current = newIntervalId;
    };

    return { timer, loading, error, refreshQuote };
}
