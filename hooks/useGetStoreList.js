import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { addStoreList } from '@/stores/storeList/slice'

function sortStores(storeListToAdd, storelist = {}) {
    const newStoreList = {...storelist}
    storeListToAdd.forEach(store => {
        const { city } = store
        if (newStoreList[city]) {
            const cityStoresList = newStoreList[city].stores
            newStoreList[city].stores = [...cityStoresList, store]
        } else {
            newStoreList[city] = {
                name: city,
                stores: [store]
            }
        }
    })
    return newStoreList
}

export default function useGetStoreList () {

    const storeList = useAppSelector(state => state.storeList)
    const dispatch = useAppDispatch()

    function handleAddStoreList(newStoresList) {
        const newStoresListSorted = sortStores(newStoresList, storeList)
        dispatch(addStoreList(newStoresListSorted))
    }
    
    return { storeList, handleAddStoreList }
}