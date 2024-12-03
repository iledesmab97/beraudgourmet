import { createSlice } from "@reduxjs/toolkit";
import {
    fetchDeliveryQuote,
    handleTimeExpirationDeliveryQuote,
    createNewDeliveryOrder,
    // fetchDeliveryTracking,
    // cancelExistingDelivery,
} from "../actions/uberDirect";

const initialState = {
    quote: null,
    order: null,
    tracking: null,
    error: null,
    loading: false,
    refresh: false,
};

const uberDirectSlice = createSlice({
    name: "uberDirect",
    initialState,
    reducers: {
        resetCount: (state, action) => {
            return {
                ...state,
                refresh: action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeliveryQuote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDeliveryQuote.fulfilled, (state, action) => {
                state.loading = false;
                state.quote = action.payload;
            })
            .addCase(fetchDeliveryQuote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(handleTimeExpirationDeliveryQuote.pending, (state) => {
                state.timeExpiration = {
                    loading: true,
                };
            })
            .addCase(createNewDeliveryOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNewDeliveryOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(createNewDeliveryOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // .addCase(fetchDeliveryTracking.pending, (state) => {
        //     state.loading = true;
        //     state.error = null;
        // })
        // .addCase(fetchDeliveryTracking.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.tracking = action.payload;
        // })
        // .addCase(fetchDeliveryTracking.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // })

        // .addCase(cancelExistingDelivery.pending, (state) => {
        //     state.loading = true;
        //     state.error = null;
        // })
        // .addCase(cancelExistingDelivery.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.order = null; // Assuming you want to clear the order state
        // })
        // .addCase(cancelExistingDelivery.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // });
    },
});

export const { resetCount } = uberDirectSlice.actions;

export default uberDirectSlice.reducer;
