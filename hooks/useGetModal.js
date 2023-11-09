import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { openModalPlace, closeModalPlace, openModalOrder, closeModalOrder } from '@/stores/modal/slice'

export default function useGetUser({modalType}) {

    const modal = useAppSelector(state => state.modal[modalType])
    const dispatch = useAppDispatch()

    function handleOpenModalPlace() {
        dispatch(openModalPlace())
    }

    function handleCloseModalPlace() {
        dispatch(closeModalPlace())
    }

    function handleOpenModalOrder(product) {
        dispatch(openModalOrder(product))
    }

    function handleCloseModalOrder() {
        dispatch(closeModalOrder())
    }

    return {open: modal.open, product: modal.currentProduct, handleOpenModalPlace, handleCloseModalPlace, handleOpenModalOrder, handleCloseModalOrder}
} 