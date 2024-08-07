import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOnePizzaById } from "../../services/productApi";

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
                    break;
                }
            }
            return product;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
