import { useCallback } from "react"
import useGetPlace from '@/hooks/useGetPlace'
import useLocalData from '@/hooks/useLocalData'
import useGetOrders from "./useGetOrders"

export default function useHandleSession() {

    const { removeLocalData } = useLocalData()
    const { handleUpdatePlaceToInitialState } = useGetPlace()
    const { handleUpdateOrderToInitialState } = useGetOrders()

    const closeSession = useCallback(async () => {
        removeLocalData('orders')
        removeLocalData('place')
        removeLocalData('user')
        // Reiniciar place
        await handleUpdatePlaceToInitialState()
        // Reinciar orders
        await handleUpdateOrderToInitialState()
    }, [])

    return { closeSession }

}