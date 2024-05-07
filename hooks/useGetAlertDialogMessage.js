import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { toggleOpen } from '@/stores/alertDialogMessage/slice'

export default function useGetAlertDialogMessage() {

    const alertDialogMessage = useAppSelector(state => state.alertDialogMessage)
    const dispatch = useAppDispatch()

    function handleToggleAlertDialogMessage(value) {
        dispatch(toggleOpen(value))
    }

    function openAlertDialogMessage(dialog) {
        const {title, text, buttonAction} = dialog
        const dialogMessage = {
            open: true,
            title,
            text,
            buttonAction
        }
        dispatch(toggleOpen(dialogMessage))
    }

    function closeAlertDialogMessage() {
        dispatch(toggleOpen({open: false}))
    }

    return { alertDialogMessage, handleToggleAlertDialogMessage, openAlertDialogMessage, closeAlertDialogMessage }
} 