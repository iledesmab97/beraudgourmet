import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import UserData from './UserData'
import StoreData from './StoreData'
import DatesData from './DatesData'
import DeliveryData from './DeliveryData'

function OtherData({ currentOrder, handleUpdateOrderProperty }) {

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
            <UserData currentOrder={currentOrder} handleUpdateOrderProperty={handleUpdateOrderProperty} />
            <Divider sx={{ width: '100%'}} />

            <StoreData currentOrder={currentOrder} handleUpdateOrderProperty={handleUpdateOrderProperty} />
            <Divider sx={{ width: '100%'}} />

            <DatesData currentOrder={currentOrder} handleUpdateOrderProperty={handleUpdateOrderProperty}/>

            <Divider sx={{ width: '100%'}} />
            <DeliveryData currentOrder={currentOrder} />
        </Box>
    )
}

export default OtherData