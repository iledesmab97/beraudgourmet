import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { changeOpen } from '@/stores/drawer/slice'

export default function useGetDrawer() {

    const drawer = useAppSelector(state => state.drawer)
    const dispatch = useAppDispatch()

    function handleChangeOpenDrawer(value) {
        dispatch(changeOpen(value))
    }

    return { drawer, handleChangeOpenDrawer }
} 