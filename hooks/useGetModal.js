import { useMemo } from 'react'
import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { openModalPlace, closeModalPlace, openModalOrder, closeModalOrder } from '@/stores/modal/slice'

export default function useGetUser({modalType}) {

    const modal = useAppSelector(state => state.modal)
    const dispatch = useAppDispatch()

    function handleOpenModalPlace() {
        dispatch(openModalPlace())
    }

    function handleCloseModalPlace() {
        dispatch(closeModalPlace())
    }

    function handleOpenModalOrder() {
        dispatch(openModalOrder())
    }

    function handleCloseModalOrder() {
        dispatch(closeModalOrder())
    }

    return {open: modal[modalType]?.open, handleOpenModalPlace, handleCloseModalPlace, handleOpenModalOrder, handleCloseModalOrder}
} 