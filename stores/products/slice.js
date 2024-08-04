import { createSlice } from "@reduxjs/toolkit";
import {
    addProductsListThunk,
    updateProductsListThunk,
} from "@/stores/actions/products";

const initialState = {
    status: "pending",
    pizzas: null,
    salads: null,
    error: null,
};
export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProductsListThunk.pending, (state) => {
                state.status = "pending";
            })
            .addCase(addProductsListThunk.fulfilled, (state, action) => {
                const { pizzas, salads } = action.payload;
                state.pizzas = pizzas;
                state.salads = salads;
                state.status = "succeeded";
            })
            .addCase(addProductsListThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updateProductsListThunk.pending, (state) => {
                state.status = "pending";
            })
            .addCase(updateProductsListThunk.fulfilled, (state, action) => {
                const { pizzas, salads } = action.payload;
                state.pizzas = pizzas;
                state.salads = salads;
                state.status = "succeeded";
            })
            .addCase(updateProductsListThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default productsSlice.reducer;
