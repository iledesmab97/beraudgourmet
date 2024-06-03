import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import UserData from './UserData'
import StoreData from './StoreData'
import DatesData from './DatesData'
import DeliveryData from './DeliveryData'

function OtherData({ currentOrder, user, store, dateEmited, dateToRecive, deliveryInformation, handleUpdateOrderProperty }) {
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
            <UserData user={user} currentOrder={currentOrder} handleUpdateOrderProperty={handleUpdateOrderProperty} />
            <Divider sx={{ width: '100%'}} />

            <StoreData store={store} />
            <Divider sx={{ width: '100%'}} />

            <DatesData dates={{dateEmited, dateToRecive}} />

            {
                deliveryInformation ?
                    <>
                        <Divider sx={{ width: '100%'}} />
                        <DeliveryData deliveryInformation={deliveryInformation} />
                    </> : null
            }
        </Box>
    )
}

export default OtherData