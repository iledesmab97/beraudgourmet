import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    getPizzasWithCosts,
    getSalads,
    updatePizza,
    updateSalad,
    updateCharacteristicsPizza,
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

export const updateProductThunk = createAsyncThunk(
    "products/updateProduct",
    async ({ type, newProduct }, { rejectWithValue }) => {
        try {
            const { id } = newProduct;
            delete newProduct.id;
            let response;
            switch (type) {
                case "pizzas":
                    if ("characteristics" in newProduct) {
                        response = await updateCharacteristicsPizza(
                            id,
                            newProduct["characteristics"]
                        );
                    } else {
                        response = await updatePizza(id, newProduct);
                    }
                    break;
                case "salads":
                    response = await updateSalad(id, newProduct);
                    break;
                default:
                    throw new Error("Unsupported product type");
            }

            return { type, newProduct: response };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
