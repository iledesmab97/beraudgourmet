import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    getPizzasWithCosts,
    getSalads,
    updatePizza,
    updateSalad,
} from "../../services/productApi";
import { delay } from "@/utils/wait";

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
            await delay(1000);
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
            let response;
            switch (type) {
                case "pizzas":
                    response = await updatePizza(
                        newProductList.id,
                        newProductList
                    );
                    break;
                case "salads":
                    response = await updateSalad(
                        newProductList.id,
                        newProductList
                    );
                    break;
                default:
                    throw new Error("Unsupported product type");
            }
            return { type, newProductList: response };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
