import React, { useState, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CenteredSpinner from "../LoadingSpinner/CenteredSpinner";
import { useSelector } from "react-redux";

const QuoteComponent = ({ helperText }) => {
    const { quote, loading, error } = useSelector((state) => state.uberQuote);
    const [timer, setTimer] = useState("10:00");
    const intervalIdRef = useRef(null);

    useEffect(() => {
        if (error || loading) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
            return;
        }

        const updateTimerFromLocalStorage = () => {
            const storedTime = localStorage.getItem("countdownTimer");
            if (storedTime) {
                setTimer(storedTime);
            }
        };

        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
        }

        updateTimerFromLocalStorage();
        intervalIdRef.current = setInterval(updateTimerFromLocalStorage, 1000);

        return () => {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
            }
        };
    }, [error, loading]);

    return (
        <Box
            maxWidth="sm"
            sx={{
                width: "100%",
            }}
        >
            {loading && (
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={1}
                >
                    <Typography
                        style={{ width: "50%" }}
                        variant="body1"
                        fontWeight="bold"
                    >
                        Precio de envío:
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
                <>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={1}
                    >
                        <Typography
                            variant="body1"
                            fontWeight="bold"
                        >
                            Precio de envío:
                        </Typography>
                        <Typography
                            variant="body1"
                            color="primary"
                        >
                            ${quote.fee / 100}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: '0.75rem',
                                textAlign: 'center',
                                color: '#295386',
                                ...helperText
                            }}
                        >
                            Este precio caducará en: <strong>{timer} min</strong>
                        </Typography>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default QuoteComponent;
