import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    phoneMissing: {
        name: 'phoneMissing',
        open: false
    },
}

export const alertDialogMessageSlice = createSlice({
    name: 'alertDialogMessage',
    initialState,
    reducers: {
        openDialogMessage: (state, action) => {
            const dialogMessage = action.payload
            return {
                ...state,
                [dialogMessage.name]: {
                    ...dialogMessage,
                    open: true
                }
            }
        },
        closeDialogMessage: (state, action) => {
            const dialogMessage = action.payload
            return {
                ...state,
                [dialogMessage.name]: {
                    ...dialogMessage,
                    open: false
                }
            }
        }
    }
})

export default alertDialogMessageSlice.reducer

export const { openDialogMessage, closeDialogMessage } = alertDialogMessageSlice.actions