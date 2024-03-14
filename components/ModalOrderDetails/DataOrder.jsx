import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import UserData from './UserData'
import StoreData from './StoreData'
import DatesData from './DatesData'
import DeliveryData from './DeliveryData'

function DataOrder({ user, store, dateEmited, dateToRecive, deliveryInformation }) {
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
            <UserData user={user} />
            <Divider sx={{ width: '100%'}} />

            <StoreData store={store} />
            <Divider sx={{ width: '100%'}} />

            <DatesData dates={{dateEmited, dateToRecive}} />
            <Divider sx={{ width: '100%'}} />

            {
                deliveryInformation ? <DeliveryData deliveryInformation={deliveryInformation} /> : null
            }
            <Divider sx={{ width: '100%'}} />
        </Box>
    )
}

export default DataOrder