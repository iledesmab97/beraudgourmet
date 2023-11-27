import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { addUser, removeUser } from '@/stores/user/slice'

export default function useGetUser() {

    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    function handleAddUser(newUser) {
        dispatch(addUser(newUser))
    }

    function handleRemoveUser() {
        dispatch(removeUser())
    }

    return {user, handleAddUser, handleRemoveUser}
} 