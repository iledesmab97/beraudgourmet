import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllStoresWithSchedules } from "../../services/storeApi"; // Ensure the correct path
import { delay } from "@/utils/wait";

export const fetchStoreListThunk = createAsyncThunk(
    "storeList/fetchStoreList",
    async (_, { rejectWithValue }) => {
        try {
            const storeList = await getAllStoresWithSchedules();
            await delay(3000);
            return storeList;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
