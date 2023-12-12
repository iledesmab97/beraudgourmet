import { useMemo } from 'react'
import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { openModal, closeModal, closeModalPlace, openModalOrder, closeModalOrder, updateModalOrder } from '@/stores/modal/slice'

export default function useGetModal({modalType}) {

    const modal = useAppSelector(state => state.modal[modalType])
    const dispatch = useAppDispatch()

    const product = useMemo(() => {
        if (modal.edit) {
            return modal.edit.item
        }
        return modal[modal.currentProduct]
    }, [modal])

    function handleOpenModal(modal) {
        dispatch(openModal(modal))
    }

    function handleCloseModal(modal) {
        dispatch(closeModal(modal))
    }

    function handleChangeModal(modalClose, modalOpen) {
        handleCloseModal(modalClose)
        handleOpenModal(modalOpen)
    }

    function handleCloseModalPlace() {
        dispatch(closeModalPlace())
    }

    function handleOpenModalOrder({item, index}) {
        dispatch(openModalOrder({item, index}))
    }

    function handleCloseModalOrder() {
        dispatch(closeModalOrder())
    }

    function handleUpdateModalOrder(newProduct) {
        dispatch(updateModalOrder(newProduct))
    }

    return {
        open: modal.open,
        product,
        edit: modal.edit,
        handleOpenModal,
        handleCloseModal,
        handleChangeModal,
        handleCloseModalPlace,
        handleOpenModalOrder,
        handleCloseModalOrder,
        handleUpdateModalOrder
    }
} 