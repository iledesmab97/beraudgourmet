import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { addOrder, removeOrder, updateOrder } from '@/stores/order/slice'

export default function useGetOrders () {

    const orders = useAppSelector(state => state.orders)
    const dispatch = useAppDispatch()

    function handleAddOrder(newOrder) {
        dispatch(addOrder(newOrder))
    }

    function handleRemoveOrder(index) {
        dispatch(removeOrder(index))
    }

    function handleUpdateOrder(newOrder) {
        dispatch(updateOrder(newOrder))
    }
    
    return {orders, handleAddOrder, handleRemoveOrder, handleUpdateOrder}
}