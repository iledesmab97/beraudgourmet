import { useCallback } from "react"
import useGetPlace from '@/hooks/useGetPlace'
import useLocalData from '@/hooks/useLocalData'

export default function useHandleSession() {

    const { removeLocalData } = useLocalData()
    const { handleUpdatePlaceToInitialState } = useGetPlace()

    const closeSession = useCallback(async () => {
        // Reiniciar place
        await handleUpdatePlaceToInitialState()
        removeLocalData('place')
    }, [])

    return { closeSession }

}