import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        addCheckout: (state, action) => {
            return action.payload
        },
        removeCheckout: (state, action) => {
            return {}
        }
    }
})

export default checkoutSlice.reducer

export const { addCheckout, removeCheckout } = checkoutSlice.actions