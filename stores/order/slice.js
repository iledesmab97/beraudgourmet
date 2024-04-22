import { createSlice } from "@reduxjs/toolkit"

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
        },
        updateOrder: (state, action) => {
            const {item, index} = action.payload
            let newOrders = [...state]
            newOrders[index] = item
            return newOrders
        },
        updateOrderToInitialState: (state, action) => {
            return initialState
        },
        updateTotalOrders: (state, action) => {
            return [...action.payload]
        }
    }
})

export default ordersSlice.reducer

export const { addOrder, removeOrder, updateOrder, updateOrderToInitialState, updateTotalOrders } = ordersSlice.actions