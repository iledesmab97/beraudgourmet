import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { addOrder } from '@/stores/order/slice'

export default function useGetOrders () {

    const orders = useAppSelector(state => state.orders)
    const dispatch = useAppDispatch()

    function handleAddOrder() {
        dispatch(addOrder({name: 'añadiendo una nueva orden'}))
    }
    
    return {orders, handleAddOrder}
}