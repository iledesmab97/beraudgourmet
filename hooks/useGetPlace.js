import { useSelector, useDispatch } from 'react-redux'
import { addPlace, removePlace } from '@/stores/place/slice'

export default function useGetPlace () {

    const place = useSelector(state => state.place)
    const dispatch = useDispatch()
    
    function handleAddPlace(newPlace) {
        dispatch(addPlace(newPlace))
    }

    function handleRemovePlace() {
        dispatch(removePlace())
    }

    return {place, handleAddPlace, handleRemovePlace}
}