import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

export const storeListSlice = createSlice({
    name: 'storeList',
    initialState,
    reducers: {
        addStoreList: (state, action) => {
            return action.payload
        }
    }
})

export default storeListSlice.reducer

export const { addStoreList } = storeListSlice.actions