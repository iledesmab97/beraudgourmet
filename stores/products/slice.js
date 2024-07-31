import { createSlice } from "@reduxjs/toolkit";
import { addProductsListThunk } from "@/stores/actions/products";
const initialState = {};
export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProductsListThunk.pending, (state) => {
                state.status = "loading";
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
            });
    },
});

export default productsSlice.reducer;
