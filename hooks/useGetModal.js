import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { openModalPlace, closeModalPlace, openModalOrder, closeModalOrder, updateModalOrder, openModalStoresDetail, closeModalStoresDetail, openModalUser, closeModalUser, openModalChangePassword, closeModalChangePassword, openModalChangeEmail, closeModalChangeEmail } from '@/stores/modal/slice'

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

    function handleOpenModalUser() {
        dispatch(openModalUser())
    }

    function handleCloseModalUser() {
        dispatch(closeModalUser())
    }

    function handleOpenModalChangePassword() {
        dispatch(openModalChangePassword())
    }

    function handleCloseModalChangePassword() {
        dispatch(closeModalChangePassword())
    }

    function handleOpenModalChangeEmail() {
        dispatch(openModalChangeEmail())
    }

    function handleCloseModalChangeEmail() {
        dispatch(closeModalChangeEmail())
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
        handleCloseModalStoresDetail,
        handleOpenModalUser,
        handleCloseModalUser,
        handleOpenModalChangePassword,
        handleCloseModalChangePassword,
        handleOpenModalChangeEmail,
        handleCloseModalChangeEmail
    }
} 