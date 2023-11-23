'use client'

import { useEffect, useState } from "react"

export default function useHandleStoresDetail({ place }) {

    const [currentStore, setCurrentStore] = useState(place)

    useEffect(() => {
        setCurrentStore(place)
    }, [place])

    function handleCurrentStoreDetail(newCurrentStore) {
        setCurrentStore(newCurrentStore)
    }

    return { currentStore, handleCurrentStoreDetail}
}