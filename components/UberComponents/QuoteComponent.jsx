import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchDeliveryQuote,
    createNewDeliveryOrder,
    fetchDeliveryTracking,
    cancelExistingDelivery,
} from "@/stores/actions/uberDirect";
import { Container, Typography, Box, CircularProgress } from "@mui/material";

const QuoteComponent = () => {
    const dispatch = useDispatch();
    const {
        inputsHome: { inputAddress },
        closerStore: { place },
    } = useSelector((state) => state.place);
    const { quote, loading, error } = useSelector((state) => state.place);
    useEffect(() => {
        console.log(inputAddress, place);
        dispatch(fetchDeliveryQuote({ place, inputAddress }));
    }, [dispatch]);

    return (
        <Container maxWidth="sm">
            {loading && (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mt={4}
                >
                    <CircularProgress />
                </Box>
            )}
            {error && (
                <Typography color="error" variant="body1" align="center" mt={4}>
                    Error: {error}
                </Typography>
            )}
            {quote && (
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={4}
                >
                    <Typography variant="body1" fontWeight="bold">
                        Precio de envío:
                    </Typography>
                    <Typography variant="body1" color="primary">
                        {quote.price} MXN
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default QuoteComponent;
