import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveryQuote } from "@/stores/actions/uberDirect";

import { resetCount } from "@/stores/uber/slice";

import {
    removeLocalData,
    getLocalData,
    saveLocalData,
} from "@/utils/manageLocalStorage";

export default function useHandleTimerDeliveryQuote(initialize) {
    const { quote, loading, error, refresh } = useSelector(
        (state) => state.uberQuote
    );
    const [timer, setTimer] = useState(null);
    const { inputsHome, closerStore } = useSelector((state) => state.place);
    const intervalId = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (loading) {
            clearInterval(intervalId.current);
            removeLocalData("expirationDate");
            return;
        }

        if (error) {
            clearInterval(intervalId.current);
            intervalId.current = null;
            removeLocalData("expirationDate");
            return;
        }

        if (initialize) {
            dispatch(resetCount(true));
        } else {
            startCountdownTimer();
        }

        return () => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
                intervalId.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (refresh) {
            dispatch(resetCount(false));
            refreshQuote();
        }
    }, [refresh]);

    function refreshQuote() {
        clearInterval(intervalId.current);
        intervalId.current = null;
        removeLocalData("expirationDate");
        removeLocalData("quote");
        setTimer("10:00");
        return startCountdownTimer();
    }

    function getDuration() {
        let duration;
        if (!getLocalData("expirationDate")) {
            duration = 600;
            const currentDate = Math.round(Date.now() / 1000);
            const expirationDate = currentDate + 600;
            saveLocalData("expirationDate", expirationDate);
        } else {
            const expirationDate = Number(getLocalData("expirationDate"));
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
                    pickup: {
                        address: closerStore.place,
                        coordinates: closerStore.coordinates,
                    },
                    dropoff: {
                        address: inputsHome.inputAddress,
                        coordinates: inputsHome.coordinates,
                    },
                })
            );
        }

        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;

        const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;

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
