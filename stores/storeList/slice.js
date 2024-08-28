import { createSlice } from "@reduxjs/toolkit";
import { fetchStoreListThunk } from "@/stores/actions/stores";

const initialState = {
    stores: [],
    status: "idle",
    error: null,
};

export const storeListSlice = createSlice({
    name: "storeList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStoreListThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchStoreListThunk.fulfilled, (state, action) => {
                state.stores = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchStoreListThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default storeListSlice.reducer;

export const { addStoreList } = storeListSlice.actions;
