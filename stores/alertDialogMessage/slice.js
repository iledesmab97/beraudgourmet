import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    open: false,
}

export const alertDialogMessageSlice = createSlice({
    name: 'alertDialogMessage',
    initialState,
    reducers: {
        toggleOpen: (state, action) => {
            return action.payload
        },
    }
})

export default alertDialogMessageSlice.reducer

export const { toggleOpen } = alertDialogMessageSlice.actions