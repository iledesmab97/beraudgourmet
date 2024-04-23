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
        return lookingForUserLoged()
            .then(( user ) => {
                if (!user) return false
                if (user.message) throw new Error(user.message)
                handleAddUser(user)
                return true
            })
            .then((response) => {
                if (!response) return false
                const modal = modalSaved()
                if (modal) {
                    handleOpenModal(modal)
                }
                return true
            })
            .catch(error => {
                if (error.message === 'No token provided') return false
                alert(error.message)
            })
    }, [])

    return { gerUserLoged }
}

export default useLogedUser