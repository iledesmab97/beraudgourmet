import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import styles from './ModalOrderDetails.module.css'

// const orderInformation = [
//     {title: 'Método de Pago', name: 'paymentMethod'},
//     {title: 'Cliente', name: 'name'},
//     {title: 'Teléfono', name: 'phoneNumber'}
// ]

function OrderData({currentOrder}) {
    return (
        <>
            <Typography variant='title'>DATOS DE LA ORDEN</Typography>
            <Typography
                className={ currentOrder.closed ? styles.closed : styles.pending }
                align='center'
                sx={{
                    width: '100%',
                    p: 1,
                    borderRadius: 3
                }}
            >
                {currentOrder.closed ? 'ENTREGADO' : 'PENDIENTE'}
            </Typography>

            <Typography
                className={ currentOrder.paid ? styles.closed : styles.pending }
                align='center'
                sx={{
                    width: '100%',
                    p: 1,
                    borderRadius: 3
                }}
            >
                {currentOrder.paid ? 'COBRADO' : 'POR COBRAR'}
            </Typography>
            <Box
                // key={user[item.name]}
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Typography
                    variant='p'
                    gutterBottom
                >
                    Método de Pago
                </Typography>
                <Typography
                    variant='p'
                    gutterBottom
                >
                    {currentOrder.paymentMethod.toUpperCase()}
                </Typography>
            </Box>
            <Box
                // key={user[item.name]}
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Typography
                    variant='p'
                    gutterBottom
                >
                    {currentOrder.paymentMethod === 'stripe' ? 'ID Stripe' : 'Nº Transferencia'}
                </Typography>
                <Typography
                    variant='p'
                    gutterBottom
                >
                    {currentOrder.StripeId}
                </Typography>
            </Box>
            <Box
                // key={user[item.name]}
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Typography
                    variant='p'
                    gutterBottom
                >
                    Recoger en tienda
                </Typography>
                <Typography
                    variant='p'
                    gutterBottom
                >
                    {currentOrder.delivery ? 'NO' : 'Sí'}
                </Typography>
            </Box>
        </>
    )
}

export default OrderData