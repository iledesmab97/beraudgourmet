import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { updateAlertMessage, closeAlertMessage } from '@/stores/alertMessage/slice'

export default function useGetAlertMessage() {

    const alertMessage = useAppSelector(state => state.alertMessage)
    const dispatch = useAppDispatch()

    function handleUpdateAlertMessage(newData) {
        dispatch(updateAlertMessage(newData))
    }

    function handleCloseAlertMessage() {
        dispatch(closeAlertMessage())
    }

    return { alertMessage, handleUpdateAlertMessage, handleCloseAlertMessage }
} 