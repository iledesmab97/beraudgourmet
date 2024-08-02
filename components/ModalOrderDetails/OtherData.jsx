import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import UserData from './UserData'
import StoreData from './StoreData'
import DatesData from './DatesData'
import DeliveryData from './DeliveryData'

import { useState, useEffect } from 'react'

import { getOneUserById } from '@/services/userApi'
import { getOneStoreById } from '@/services/storeApi'
import { getDeliveryInformationOfOrder } from '@/services/orderApi'

function OtherData({ currentOrder, handleUpdateOrderProperty }) {

    const [userSelected, setUserSelected] = useState(null)
    const [loadingUser, setLoadingUser] = useState(true)
    const [errorUser, setErrorUser] = useState('')

    const [storeSelected, setStoreSelected] = useState(null)
    const [loadingStore, setLoadingStore] = useState(true)
    const [errorStore, setErrorStore] = useState('')

    const [delivery, setDelivery] = useState(null)
    const [loadingDelivery, setLoadigDelivery] = useState(true)
    const [errorDelivery, setErrorDelivery] = useState('')

    useEffect(() => {
        async function getData() {
            if (!userSelected) {
                const user = await getOneUserById(currentOrder.UserId)
                if (user.message) {
                    setErrorUser(user.message)
                } else {
                    setUserSelected(user)
                }
                setLoadingUser(false)
            }
            if (!storeSelected) {
                const store = await getOneStoreById(currentOrder.StoreId)
                if (store.message) {
                    setErrorStore(store.message)
                } else {
                    setStoreSelected(store)
                }
                setLoadingStore(false)
            }
            if (!delivery) {
                const deliveryInformation = await getDeliveryInformationOfOrder(currentOrder.id)
                if (deliveryInformation.message) {
                    setErrorDelivery(deliveryInformation.message)
                }
                else {
                    setDelivery(deliveryInformation)
                }
                setLoadigDelivery(false)
            }
        }
        getData()
    }, [])

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
            <UserData userSelected={userSelected} loading={loadingUser} error={errorUser} currentOrder={currentOrder} handleUpdateOrderProperty={handleUpdateOrderProperty} />
            <Divider sx={{ width: '100%'}} />

            <StoreData storeSelected={storeSelected} loading={loadingStore} error={errorStore} currentOrder={currentOrder} handleUpdateOrderProperty={handleUpdateOrderProperty} />
            <Divider sx={{ width: '100%'}} />

            <DatesData currentOrder={currentOrder} handleUpdateOrderProperty={handleUpdateOrderProperty}/>

            <Divider sx={{ width: '100%'}} />
            <DeliveryData delivery={delivery} loading={loadingDelivery} error={errorDelivery} currentOrder={currentOrder} />
        </Box>
    )
}

export default OtherData