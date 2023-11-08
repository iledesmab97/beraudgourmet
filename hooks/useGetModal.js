import { useState, useEffect, useMemo } from 'react'
import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { openModal, closeModal } from '@/stores/modal/slice'

export default function useGetUser({modaltype}) {

    const modal = useAppSelector(state => state.modal)
    const dispatch = useAppDispatch()

    // const [open, setOpen] = useState(false)

    const open = useMemo(() => {
        if (!modal || modal !== modaltype) {
            return false
        } else if (modal === modaltype)
            return true
    }, [modal])

    // useEffect(() => {
    //     console.log('modal from globalState:', modal)
    //     if (!modal || modal !== modaltype) {
    //         return setOpen(false)
    //     }
    //     setOpen(true)
    // }, [modal])

    function handleOpenModal(modal) {
        dispatch(openModal(modal))
    }

    function handleCloseModal() {
        dispatch(closeModal())
    }

    return {open, handleOpenModal, handleCloseModal}
} 