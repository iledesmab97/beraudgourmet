import { useSelector, useDispatch } from 'react-redux'
import { addPlace, removePlace, addDeadLine, addTypeDelivery } from '@/stores/place/slice'

export default function useGetPlace () {

    const place = useSelector(state => state.place)
    const dispatch = useDispatch()
    
    function handleAddPlace(newPlace) {
        dispatch(addPlace(newPlace))
    }

    function handleRemovePlace() {
        dispatch(removePlace())
    }

    function handleDeadLine(time) {
        dispatch(addDeadLine(time))
    }

    function handleTypeDelivery(date) {
        dispatch(addTypeDelivery(date))
    }

    return {place, handleAddPlace, handleRemovePlace, handleDeadLine, handleTypeDelivery}
}