import { useSelector, useDispatch } from 'react-redux'

export default function useGetOrders () {

    const orders = useSelector(state => state.orders)
    
    return {orders}
}