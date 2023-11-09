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
        }
    }
})

export default ordersSlice.reducer

export const { addOrder } = ordersSlice.actions