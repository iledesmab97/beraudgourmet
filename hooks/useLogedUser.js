import { useCallback } from "react"
import { lookingForUserLoged, saveToken } from '@/services/userApi'
import useGetUser from '@/hooks/useGetUser'
import { modalSaved } from '@/utils/modal'
import useGetModal from '@/hooks/useGetModal'

function useLogedUser(userJWT) {
    console.log('userJWT desde useLogedUser:', userJWT)
    // const [ userIsLoged, setUserIsLoged ] = useState(false)

    const { handleAddUser } = useGetUser()
    const { handleOpenModal } = useGetModal({ modalType: 'userOrders' })

    const gerUserLoged = useCallback(async () => {
        if (Object.keys(userJWT).length) {
            // const expires = Number(userJWT["Max-Age"])/(1000*60*60*24)
            await saveToken( userJWT )
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