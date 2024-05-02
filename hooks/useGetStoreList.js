import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { addStoreList } from '@/stores/storeList/slice'

function sortStores(storeListToAdd, storelist = {}) {
    // Creo una copia del storeList actual
    const newStoreList = {...storelist}
    // Itero sobre cada elemento de la lista de stores que deseo ordenar
    storeListToAdd.forEach(store => {
        // Extraigo la propiedad city de cada store de la lista
        const { city } = store
        // Evaluo si la ciudad ya está agregada al objeto newStoreList. 
        if (newStoreList[city]) {
            // Si ya lo está, creo una copia del array contenido en la propidad stores
            const cityStoresList = newStoreList[city].stores
            newStoreList[city].stores = [...cityStoresList, store]
        } else {
            //De lo contrario agrego la ciuedad como propiedad y como valor un objeto con las propiedades: name (nombre de la ciudad) y stores (array de stores en la ciudad) al que le agrego el store sobre el que estoy iterando.
            newStoreList[city] = {
                name: city,
                stores: [store]
            }
        }
    })
    return newStoreList
}

export function listStores(storeList) {
    const arrayStoreList = []
    if (Object.keys(storeList).length) {
        for (let city in storeList) {
            storeList[city].stores.forEach(store => {
                const newStore = {
                    ...store,
                    city
                }
                arrayStoreList.push(newStore)
            })
        }
    }
    return arrayStoreList
}

export default function useGetStoreList () {

    const storeList = useAppSelector(state => state.storeList)
    const dispatch = useAppDispatch()

    function handleAddStoreList(newStoresList) {
        const newStoresListSorted = sortStores(newStoresList, storeList)
        dispatch(addStoreList(newStoresListSorted))
    }

    function handleUpdateStoreList({ id, property, value }) {
        const arrayStoreList = listStores(storeList)
        const newArrayStoreList = arrayStoreList.map(store => {
            if (store.id !== id) return store
            let newStore
            if (property === 'lat' || property === 'lng') {
                newStore = {
                    ...store,
                    coordinates: {
                        ...store.coordinates,
                        [property]: value
                    }
                }    
            } else {
                newStore = {
                    ...store,
                    [property]: value
                }
            }
            return newStore
        })
        const newStoresListSorted = sortStores(newArrayStoreList)
        dispatch(addStoreList(newStoresListSorted))
    }

    function updateScheduleHoursStore(newScheduleHours) {
        const arrayStoreList = listStores(storeList)
        let indexStore
        arrayStoreList.find((store, index) => {
            if (store.id === newScheduleHours.id) {
                indexStore = index
            }
        })
        arrayStoreList[indexStore] = newScheduleHours
        const newStoreList = sortStores(arrayStoreList)
        dispatch(addStoreList(newStoreList))
    }
    
    return { storeList, handleAddStoreList, handleUpdateStoreList, updateScheduleHoursStore }
}