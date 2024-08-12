import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchDeliveryQuote,
    createNewDeliveryOrder,
    fetchDeliveryTracking,
    cancelExistingDelivery,
} from "@/stores/actions/uberDirect";
import { Container, Typography, Box } from "@mui/material";
import CenteredSpinner from "../LoadingSpinner/CenteredSpinner";

const QuoteComponent = ({ closerStore }) => {
    const { quote, loading, error } = useSelector((state) => state.uberQuote);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            fetchDeliveryQuote({
                pickup_address: closerStore.place,
                dropoff_address: localStorage.getItem("dropoff_address"),
            })
        );
    }, [dispatch]);

    return (
        <Container maxWidth="sm">
            {loading && (
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={4}
                >
                    <Typography
                        style={{ width: "50%" }}
                        variant="body1"
                        fontWeight="bold"
                    >
                        Precio de envío estimado (15min):
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
                        Precio de envío estimado (15min):
                    </Typography>
                    <Typography variant="body1" color="primary">
                        {quote.fee / 100} MXN
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default QuoteComponent;
