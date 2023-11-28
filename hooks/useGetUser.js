import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { addUser, removeUser, updateUser } from '@/stores/user/slice'

export default function useGetUser() {

    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    function handleAddUser(newUser) {
        dispatch(addUser(newUser))
    }

    function handleRemoveUser() {
        dispatch(removeUser())
    }

    function handleUpdateUser(newData) {
        dispatch(updateUser(newData))
    }

    return {user, handleAddUser, handleRemoveUser, handleUpdateUser}
} 