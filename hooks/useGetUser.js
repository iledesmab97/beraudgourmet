import { useSelector, useDispatch } from 'react-redux'

export default function useGetUser() {

    const user = useSelector(state => state.users)

    return {user}
} 