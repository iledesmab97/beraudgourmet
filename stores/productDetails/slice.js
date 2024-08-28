import { createSlice } from "@reduxjs/toolkit";
import {
    addProductDetailsThunk,
    removeProductDetailsThunk,
} from "@/stores/actions/productDetails";

const initialState = {};
export const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProductDetailsThunk.pending, (state) => {
                state.status = "pending";
            })
            .addCase(addProductDetailsThunk.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = "succeeded";
            })
            .addCase(addProductDetailsThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(removeProductDetailsThunk.pending, (state) => {
                state.status = "pending";
            })
            .addCase(removeProductDetailsThunk.fulfilled, (state, action) => {
                delete state.data;
                delete state.status;
                delete state.error;
            })
            .addCase(removeProductDetailsThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default productDetailsSlice.reducer;
