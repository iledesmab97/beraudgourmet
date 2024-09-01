import { createSlice } from "@reduxjs/toolkit";
import {
    addProductsListThunk,
    updateProductThunk,
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
                console.log(pizzas, salads);
                state.status = "succeeded";
            })
            .addCase(addProductsListThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updateProductThunk.pending, (state) => {
                state.status = "pending";
            })
            .addCase(updateProductThunk.fulfilled, (state, action) => {
                const { type, newProduct } = action.payload;

                const newList = JSON.parse(JSON.stringify(state[type]));
                let index;
                const currentItem = newList.find((item, i) => {
                    index = i;
                    return item.id === newProduct.id;
                });

                newList[index] = newProduct;
                state[type] = newList;

                state.status = "succeeded";
            })
            .addCase(updateProductThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default productsSlice.reducer;
