import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import CenteredSpinner from "../LoadingSpinner/CenteredSpinner";

import { useSelector } from "react-redux";

const QuoteComponent = () => {
    const { quote, loading, error, timeExpiration } = useSelector((state) => state.uberQuote);
    const { currentTimer } = timeExpiration

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
                        Precio de envío estimado ({currentTimer && currentTimer.min > 0? currentTimer.min: 'recalculando...'} min):
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
                        Precio de envío estimado ({currentTimer && currentTimer.min > 0? currentTimer.min: 'recalculando...'} min):
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
