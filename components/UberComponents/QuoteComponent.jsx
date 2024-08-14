import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import CenteredSpinner from "../LoadingSpinner/CenteredSpinner";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchDeliveryQuote,
    createNewDeliveryOrder,
    fetchDeliveryTracking,
    cancelExistingDelivery,
} from "@/stores/actions/uberDirect";
import { timeOutCalculator, howMuchLeftTime } from '@/utils/hours'

const QuoteComponent = () => {
    const { quote, loading, error } = useSelector((state) => state.uberQuote);
    const { inputsHome, closerStore } = useSelector(state => state.place)
    const timeOut = useRef(timeOutCalculator(10))
    const [currentTimer, setCurrentTimer] = useState(howMuchLeftTime(timeOut.current))
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!closerStore) return
        dispatch(
            fetchDeliveryQuote({
                pickup_address: closerStore.place,
                dropoff_address: inputsHome.inputAddress,
            })
        );
    }, [closerStore]);

    // turn timeOut on and off
    useEffect(() => {
        function activeClock() {
            const newCurrentTime = howMuchLeftTime(timeOut.current)
            setCurrentTimer(newCurrentTime)
        }   
        const intervalId = setInterval(activeClock, 1000)
        return () => {
            clearInterval(intervalId)
        }
    }, [])

    return (
        <Box
            maxWidth="sm"
            sx={{
                width: '100%'
            }}
        >
            {loading && (
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={2}
                >
                    <Typography
                        style={{ width: "50%" }}
                        variant="body1"
                        fontWeight="bold"
                    >
                        Precio de envío estimado ({currentTimer}):
                    </Typography>
                    <CenteredSpinner
                        width={20}
                        height={20}
                        large={"50%"}
                        justifyContent="flex-end"
                    />
                </Box>
            )}
            {error && (
                <Typography color="error" variant="body1" align="center" mt={4}>
                    Error: {error}
                </Typography>
            )}
            {quote && loading === false && (
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={4}
                >
                    <Typography variant="body1" fontWeight="bold">
                        Precio de envío estimado ({currentTimer}):
                    </Typography>
                    <Typography variant="body1" color="primary">
                        {quote.fee / 100} MXN
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default QuoteComponent;
