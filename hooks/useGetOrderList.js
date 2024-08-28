import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { addOrderList } from '@/stores/orderList/slice'

export default function useGetOrderList () {

    const orderList = useAppSelector(state => state.orderList)
    const dispatch = useAppDispatch()

    function handleAddOrderList(newOrderList) {
        dispatch(addOrderList(newOrderList))
    }
    
    return { orderList, handleAddOrderList }
}