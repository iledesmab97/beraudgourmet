import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    getPizzasWithCosts,
    getSalads,
    updateProductListApi,
} from "../../services/productApi";

export const addProductsListThunk = createAsyncThunk(
    "products/addProductsList",
    async (_, { rejectWithValue }) => {
        try {
            const pizzas = await getPizzasWithCosts();
            const salads = await getSalads();
            const products = {
                pizzas,
                salads,
            };
            return products;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateProductsListThunk = createAsyncThunk(
    "products/updateProductsList",
    async ({ type, newProductList }, { rejectWithValue }) => {
        try {
            // Simulate an API call
            const response = await updateProductListApi(type, newProductList); // Replace with actual API call
            return { type, newProductList: response };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
