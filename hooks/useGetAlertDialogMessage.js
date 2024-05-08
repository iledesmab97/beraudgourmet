import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { openDialogMessage, closeDialogMessage } from '@/stores/alertDialogMessage/slice'

export default function useGetAlertDialogMessage({ type }) {

    const alertDialogMessage = useAppSelector(state => state.alertDialogMessage[type])
    const dispatch = useAppDispatch()

    function openAlertDialogMessage() {
        dispatch(openDialogMessage(alertDialogMessage))
    }

    function closeAlertDialogMessage() {
        dispatch(closeDialogMessage(alertDialogMessage))
    }
    
    return { alertDialogMessage, openAlertDialogMessage, closeAlertDialogMessage }
} 