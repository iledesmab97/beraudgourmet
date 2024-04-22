import { useCallback, useEffect, useRef } from 'react'
import useGetPlace from '@/hooks/useGetPlace'
import useGetOrders from '@/hooks/useGetOrders'

import { deepEqual } from '@/utils/preparingData'

function useLocalData() {
    
    const { place, handleAddPlace } = useGetPlace()
    const { orders, handleUpdateTotalOrders } = useGetOrders()
    const firstTime = useRef(true)
    const firstTimeOrders = useRef(true)

    useEffect(() => {
        const placeLocalString = getLocalData('place')
        const placeLocal = placeLocalString ? JSON.parse(placeLocalString) : placeLocalString
        if (firstTime.current) {
            firstTime.current = false
            if (!Object.keys(place).length && placeLocal) {
                handleAddPlace(placeLocal)
            }
        } else {
            if (!deepEqual(placeLocal, place)) {
                saveLocalData('place', place)
            }
        }
        
    }, [place])

    useEffect(() => {
        const ordersLocalString = getLocalData('orders')
        const ordersLocal = ordersLocalString ? JSON.parse(ordersLocalString) : ordersLocalString
        if (firstTimeOrders.current) {
            firstTimeOrders.current = false
            if (!orders.length && ordersLocal?.length) {
                handleUpdateTotalOrders(ordersLocal)
            }
        } else {
            if (!deepEqual(ordersLocal, orders)) {
                saveLocalData('orders', orders)
            }
        }
    }, [orders])

    const getLocalData = useCallback((key) => {
        const dataFromLocal = localStorage.getItem(key)
        return dataFromLocal
    }, [])

    const saveLocalData = useCallback((key, value) => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [])

    const removeLocalData = useCallback((key) => {
        localStorage.removeItem(key)
    }, [])

    const removeAllLocalData = useCallback(() => {
        localStorage.clear()
    }, [])

    return { getLocalData, saveLocalData, removeLocalData, removeAllLocalData }
}

export default useLocalData