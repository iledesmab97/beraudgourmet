import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import styles from './ModalCheckoutForm.module.css'

function DataOrder({ user, place, preMessageDelivery, messageDelivery }) {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px'
            }}
        >
            <Box
                className={styles.CheckoutFormInvoiceData}
            >
                <Typography
                    variant='p'
                    gutterBottom
                >
                    Para:
                </Typography>
                <Typography
                    variant='p'
                    gutterBottom
                >
                    {user.name}
                </Typography>
            </Box>
            <Box
                className={styles.CheckoutFormInvoiceData}
            >
                <Typography
                    variant='p'
                    gutterBottom
                >
                    De:
                </Typography>
                <Typography
                    variant='p'
                    gutterBottom
                >
                    {place.closerStore && place.closerStore.name}
                </Typography>
            </Box>
            {
                place.typeDelivery && place.typeDelivery.name  === 'home' ?
                (
                    <Box
                        className={styles.CheckoutFormInvoiceData}
                    >    
                        <Typography
                            variant='p'
                            gutterBottom
                        >
                            Dirección:
                        </Typography>
                        <Typography
                            variant='p'
                            gutterBottom
                        >
                            {`${place.inputsHome.street.unity}/${place.inputsHome.street.number} ${place.inputsHome.street.streetName}, ${place.inputsHome.inputAddress.split(",")[0]}`}
                        </Typography>
                    </Box>
                ) : (
                    null
                )
            }
            <Box
                className={styles.CheckoutFormInvoiceData}
            >
                <Typography
                    variant='p'
                    gutterBottom
                >
                    {preMessageDelivery}
                </Typography>
                <Typography
                    variant='p'
                    gutterBottom
                >
                    {messageDelivery}
                </Typography>
            </Box>
        </Box>
    )
}

export default DataOrder