import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getDeliveryQuote,
    createDeliveryOrder,
    trackDelivery,
    cancelDelivery,
} from "../../services/uberDirectApi";
import { saveLocalData } from "@/utils/manageLocalStorage";

// Async thunk to get delivery quote
export const fetchDeliveryQuote = createAsyncThunk(
    "uberDirect/fetchDeliveryQuote",
    async ({ pickup, dropoff }, { rejectWithValue }) => {
        try {
            const quote = await getDeliveryQuote({
                pickup,
                dropoff,
            });
            saveLocalData("quote", quote);
            return quote;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk to create delivery order
export const createNewDeliveryOrder = createAsyncThunk(
    "uberDirect/createDeliveryOrder",
    async (orderDetails, { rejectWithValue }) => {
        try {
            const order = await createDeliveryOrder(orderDetails);
            return order;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk to track delivery
export const fetchDeliveryTracking = createAsyncThunk(
    "uberDirect/fetchDeliveryTracking",
    async (deliveryId, { rejectWithValue }) => {
        try {
            const trackingInfo = await trackDelivery(deliveryId);
            return trackingInfo;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk to cancel delivery
export const cancelExistingDelivery = createAsyncThunk(
    "uberDirect/cancelDelivery",
    async (deliveryId, { rejectWithValue }) => {
        try {
            const cancelResponse = await cancelDelivery(deliveryId);
            return cancelResponse;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const handleTimeExpirationDeliveryQuote = createAsyncThunk(
    "uberDirect/handleTimeExpirationDeliveryQuote",
    async ({ currentTimer, status }, { rejectWithValue }) => {
        try {
            switch (status) {
                case "init": {
                    return { currentTimer, status };
                }
                case "update": {
                    return { status };
                }
                case "remove": {
                    return { status };
                }
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
