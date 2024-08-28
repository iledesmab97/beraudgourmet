import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { addOrder, removeOrder, updateOrder, updateOrderToInitialState, updateTotalOrders } from '@/stores/order/slice'

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

    function handleUpdateOrderToInitialState() {
        dispatch(updateOrderToInitialState())
    }

    function handleUpdateTotalOrders(newOrders) {
        dispatch(updateTotalOrders(newOrders))
    }
    
    return {orders, handleAddOrder, handleRemoveOrder, handleUpdateOrder, handleUpdateOrderToInitialState, handleUpdateTotalOrders}
}