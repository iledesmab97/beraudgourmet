import { useSelector, useDispatch } from 'react-redux'

export default function useGetOrders () {

    const place = useSelector(state => state.place)
    
    return {place}
}