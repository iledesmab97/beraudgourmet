import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { openModalPlace, closeModalPlace, openModalOrder, closeModalOrder, updateModalOrder, openModalStoresDetail, closeModalStoresDetail } from '@/stores/modal/slice'

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

    function handleUpdateModalOrder(newProduct) {
        dispatch(updateModalOrder(newProduct))
    }

    function handleOpenModalStoresDetail() {
        dispatch(openModalStoresDetail())
    }

    function handleCloseModalStoresDetail() {
        dispatch(closeModalStoresDetail())
    }

    return {
        open: modal.open,
        product: modal[modal.currentProduct],
        handleOpenModalPlace,
        handleCloseModalPlace,
        handleOpenModalOrder,
        handleCloseModalOrder,
        handleUpdateModalOrder,
        handleOpenModalStoresDetail,
        handleCloseModalStoresDetail
    }
} 