import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    checked: false,
    text: '',
    status: '',
}

export const alertMessageSlice = createSlice({
    name: 'alertMessage',
    initialState,
    reducers: {
        updateAlertMessage: (state, action) => {
            return action.payload
        },
        closeAlertMessage: (state, action) => {
            return {
                ...state,
                checked: false
            }
        }
    }
})

export default alertMessageSlice.reducer

export const { updateAlertMessage, closeAlertMessage } = alertMessageSlice.actions