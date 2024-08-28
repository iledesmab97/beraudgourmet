import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: false,
    order: false,
    store: false,
    // pay: false
}

export const stepsSlice = createSlice({
    name: 'steps',
    initialState,
    reducers: {
        changeStep: (state, action) => {
            return action.payload
        }
    }
})

export default stepsSlice.reducer

export const { changeStep } = stepsSlice.actions