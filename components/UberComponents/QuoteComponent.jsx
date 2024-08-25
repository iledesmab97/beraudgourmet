import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CenteredSpinner from "../LoadingComponets/CenteredSpinner";
import useHandleTimerDeliveryQuote from "@/hooks/useHandleTimerDeliveryQuote";

const QuoteComponent = ({ text, spinner, helperText }) => {
    const { timer, loading, error } = useHandleTimerDeliveryQuote();

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
                        variant="body1"
                        fontWeight="bold"
                        style={{
                            width: "70%",
                            ...text,
                        }}
                    >
                        Precio de envío:
                    </Typography>
                    <CenteredSpinner
                        width={20}
                        height={20}
                        large={"50%"}
                        justifyContent="flex-end"
                        {...spinner}
                    />
                </Box>
            )}
            {error && (
                <Typography color="error" variant="body1" align="center" mt={4}>
                    Error: {error}
                </Typography>
            )}
            {timer && (
                <>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={1}
                    >
                        <Typography variant="body1" fontWeight="bold">
                            Precio de envío:
                        </Typography>
                        <Typography variant="body1" color="primary">
                            ${localStorage.getItem("quote")}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: "0.75rem",
                                textAlign: "center",
                                color: "#295386",
                                ...helperText,
                            }}
                        >
                            Este precio caducará en:{" "}
                            <strong>{timer} min</strong>
                        </Typography>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default QuoteComponent;
