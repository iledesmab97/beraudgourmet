import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOnePizzaById, getOneSaladById } from "../../services/productApi";

export const addProductDetailsThunk = createAsyncThunk(
    "productDetails/addProductDetails",
    async ({ id, type }, { rejectWithValue }) => {
        try {
            let product;
            switch (type) {
                case "pizza": {
                    product = await getOnePizzaById(id);
                    break;
                }
                case "salad": {
                    product = await getOneSaladById(id);
                    break;
                }
            }
            return product;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const removeProductDetailsThunk = createAsyncThunk(
    "productDetails/removeProductDetails",
    async (_, { rejectWithValue }) => {
        try {
            return;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
