import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const orderListSlice = createSlice({
    name: 'orderList',
    initialState,
    reducers: {
        addOrderList: (state, action) => {
            return action.payload
        }
    }
})

export default orderListSlice.reducer

export const { addOrderList } = orderListSlice.actions