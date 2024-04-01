import { useCallback, useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import { lookingForUserLoged, saveToken } from '@/services/userApi'
import useGetUser from '@/hooks/useGetUser'
import { modalSaved } from '@/utils/modal'
import useGetModal from '@/hooks/useGetModal'

function useLogedUser() {

    const searchParams = useSearchParams()
    const { handleAddUser } = useGetUser()
    const { handleOpenModal } = useGetModal({ modalType: 'userOrders' })

    const tokenUser = searchParams.get('tokenUser')

    const gerUserLoged = useCallback(async () => {
        if (tokenUser) {
            await saveToken( tokenUser )
        }
        lookingForUserLoged()
            .then(( user ) => {
                if (!user) return false
                if (user.message) throw new Error(user.message)
                handleAddUser(user)
                return true
            })
            .then((response) => {
                if (!response) return
                const modal = modalSaved()
                if (modal) {
                    handleOpenModal(modal)
                }
            })
            .catch(error => {
                if (error.message === 'No token provided') return
                alert(error.message)
            })
    }, [])

    return { gerUserLoged }
}

export default useLogedUser