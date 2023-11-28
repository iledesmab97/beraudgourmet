import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { openModal, closeModal, closeModalPlace, openModalOrder, closeModalOrder, updateModalOrder } from '@/stores/modal/slice'

export default function useGetUser({modalType}) {

    const modal = useAppSelector(state => state.modal[modalType])
    const dispatch = useAppDispatch()

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

    function handleOpenModalOrder(product) {
        dispatch(openModalOrder(product))
    }

    function handleCloseModalOrder() {
        dispatch(closeModalOrder())
    }

    function handleUpdateModalOrder(newProduct) {
        dispatch(updateModalOrder(newProduct))
    }

    return {
        open: modal.open,
        product: modal[modal.currentProduct],
        handleOpenModal,
        handleCloseModal,
        handleChangeModal,
        handleCloseModalPlace,
        handleOpenModalOrder,
        handleCloseModalOrder,
        handleUpdateModalOrder
    }
} 