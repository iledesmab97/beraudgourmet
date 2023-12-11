import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { addCheckout, removeCheckout } from '@/stores/checkout/slice'

export default function useGetCheckout() {

    const checkout = useAppSelector(state => state.checkout)
    const dispatch = useAppDispatch()

    function handleAddCheckout(checkoutObject) {
        dispatch(addCheckout(checkoutObject))
    }

    function handleRemoveCheckout() {
        dispatch(removeCheckout())
    }

    return {
        checkout,
        handleAddCheckout,
        handleRemoveCheckout
    }
} 