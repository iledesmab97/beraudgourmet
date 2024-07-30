import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: 0,
    totalOrders: 0,
    list: []
}

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