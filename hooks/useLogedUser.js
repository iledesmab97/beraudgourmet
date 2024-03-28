import { useCallback, useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import { lookingForUserLoged, saveToken } from '@/services/userApi'
import useGetUser from '@/hooks/useGetUser'
import { modalSaved } from '@/utils/modal'
import useGetModal from '@/hooks/useGetModal'

function useLogedUser() {
    console.log('entrando en useLogedUser')
    // const [ userIsLoged, setUserIsLoged ] = useState(false)
    const searchParams = useSearchParams()
    const { handleAddUser } = useGetUser()
    const { handleOpenModal } = useGetModal({ modalType: 'userOrders' })

    const tokenUser = searchParams.get('tokenUser')
    console.log('tokenUser que es parte del state del useLogedUser:', tokenUser)

    const gerUserLoged = useCallback(async () => {
        console.log('entrando en gerUserLoged con tokeUser:', tokenUser)
        if (tokenUser) {
            console.log('entrando en el condicional if de getUserLoged')
            // const expires = Number(userJWT["Max-Age"])/(1000*60*60*24)
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
                    localStorage.removeItem('modalToOpen')
                }
            })
            .catch(error => {
                console.log('algo salió mal y entré en el catch del useEffect')
                if (error.message === 'No token provided') return
                alert(error.message)
            })
    }, [])

    return { gerUserLoged }
}

export default useLogedUser