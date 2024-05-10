import { useCallback, useEffect, useRef, useState } from 'react'
import useGetPlace from '@/hooks/useGetPlace'
import useGetOrders from '@/hooks/useGetOrders'
import useGetStoreList from '@/hooks/useGetStoreList'
import useGetProducts from '@/hooks/useGetProducts'

import { deepEqual, listStores } from '@/utils/preparingData'

function useLocalData() {
    
    const { place, handleAddPlace } = useGetPlace()
    const { orders, handleUpdateTotalOrders } = useGetOrders()
    const { products } = useGetProducts({type: 'pizzas'})
    const { storeList } = useGetStoreList()
    const [storeListArray, setStoreListArray] = useState([])

    const firstTime = useRef(true)
    const firstTimeOrders = useRef(true)

    useEffect(() => {
        if(!storeListArray.length) return
        const placeLocal = getLocalData('place')
        if (firstTime.current && placeLocal) {
            firstTime.current = false
            const closerStore = storeListArray.find(store => store.id === placeLocal.closerStore)
            if (!Object.keys(place).length && placeLocal && closerStore) {
                handleAddPlace({
                    ...placeLocal,
                    closerStore
                })
            }
        } else {
            if (!Object.keys(place).length) return
            const placeToCompare = {
                ...place,
                closerStore: place.closerStore.id
            }
            if (!deepEqual(placeLocal, placeToCompare)) {
                saveLocalData('place', placeToCompare)
            }            
        }
        
    }, [place, storeListArray])

    useEffect(() => {
        setStoreListArray(listStores(storeList))
    }, [storeList])

    useEffect(() => {
        if( !products || !products.length) return
        const ordersLocal = getLocalData('orders')
        if (firstTimeOrders.current) {
            firstTimeOrders.current = false
            if (!orders.length && ordersLocal?.length) {
                handleUpdateTotalOrders(ordersLocal.map(item => {
                    const product = products.find(element => element.id === item.id)
                    return {
                        ...product,
                        ...item
                    }
                }))
            }
        } else {
            const orderToCompare = orders.map(item => {
                const { id, size, quantity, mass, ingredientsModal, extra, totalPrice } = item
                return {
                    id,
                    size,
                    quantity,
                    mass,
                    ingredientsModal,
                    extra,
                    totalPrice
                }
            })
            if (!deepEqual(ordersLocal, orderToCompare)) {
                saveLocalData('orders', orderToCompare)
            }
        }
    }, [orders, products])

    const getLocalData = useCallback((key) => {
        const dataFromLocal = localStorage.getItem(key)
        return JSON.parse(dataFromLocal)
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