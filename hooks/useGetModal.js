import { useMemo } from 'react'
import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { openModal, closeModal } from '@/stores/modal/slice'

export default function useGetUser({modaltype}) {

    const modal = useAppSelector(state => state.modal)
    const dispatch = useAppDispatch()

    const open = useMemo(() => {
        if (!modal || modal !== modaltype) {
            return false
        } else if (modal === modaltype)
            return true
    }, [modal])

    function handleOpenModal() {
        dispatch(openModal(modaltype))
    }

    function handleCloseModal() {
        dispatch(closeModal())
    }

    return {open, handleOpenModal, handleCloseModal}
} 