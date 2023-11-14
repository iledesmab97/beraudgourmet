import { createSlice } from "@reduxjs/toolkit"

const order = {
    email: '',
    name: '',
    phone: '',
    password: '',
    notifications: ''
}

const initialState = []

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action) => {
            return [...state, action.payload]
        },
        removeOrder: (state, action) => {
            return state.filter((order, index) => index !== action.payload)
        }
    }
})

export default ordersSlice.reducer

export const { addOrder, removeOrder } = ordersSlice.actions