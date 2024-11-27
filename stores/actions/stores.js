import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllStores } from "../../services/storeApi"; // Ensure the correct path

export const fetchStoreListThunk = createAsyncThunk(
    "storeList/fetchStoreList",
    async (queries, { rejectWithValue }) => {
        try {
            const storeList = await getAllStores(queries);
            return storeList;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
