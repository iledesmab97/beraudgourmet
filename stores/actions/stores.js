import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllStoresWithSchedules } from "../../services/storeApi"; // Ensure the correct path

export const fetchStoreListThunk = createAsyncThunk(
    "storeList/fetchStoreList",
    async (_, { rejectWithValue }) => {
        try {
            const storeList = await getAllStoresWithSchedules();
            return storeList;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
