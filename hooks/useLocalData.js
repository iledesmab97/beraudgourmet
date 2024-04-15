import { useCallback, useEffect, useRef } from 'react'
import useGetPlace from '@/hooks/useGetPlace'

import { deepEqual } from '@/utils/preparingData'

function useLocalData() {
    
    const { place, handleAddPlace } = useGetPlace()
    const firstTime = useRef(true)

    useEffect(() => {
        const placeLocalString = getLocalData('place')
        const placeLocal = JSON.parse(placeLocalString)
        if (firstTime.current) {
            firstTime.current = false
            if (!Object.keys(place).length) {
                handleAddPlace(placeLocal)
            }
        } else {
            if (!deepEqual(placeLocal, place)) {
                saveLocalData('place', place)
            }
        }
        
    }, [place])

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

    return { getLocalData, saveLocalData, removeLocalData }
}

export default useLocalData