import { createSlice } from "@reduxjs/toolkit";
import {
    fetchDeliveryQuote,
    handleTimeExpirationDeliveryQuote,
    // createNewDeliveryOrder,
    // fetchDeliveryTracking,
    // cancelExistingDelivery,
} from "../actions/uberDirect";

const initialState = {
    quote: null,
    order: null,
    tracking: null,
    // error: null,
    // loading: false,
    timeExpiration: {},
};

const uberDirectSlice = createSlice({
    name: "uberDirect",
    initialState,
    reducers: {},
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
            .addCase(
                handleTimeExpirationDeliveryQuote.fulfilled,
                (state, action) => {
                    const { timeOut, currentTimer, status } = action.payload;
                    switch (status) {
                        case "init": {
                            state.timeExpiration = {
                                timeOut,
                                currentTimer,
                            };
                            break;
                        }
                        case "update": {
                            state.timeExpiration = {
                                ...state.timeExpiration,
                                currentTimer,
                            };
                            break;
                        }
                        case "remove": {
                            state.timeExpiration = {};
                            break;
                        }
                    }
                }
            )
            .addCase(
                handleTimeExpirationDeliveryQuote.rejected,
                (state, action) => {
                    state.timeExpiration = {
                        loading: false,
                        error: action.payload,
                    };
                }
            );
        // .addCase(createNewDeliveryOrder.pending, (state) => {
        //     state.loading = true;
        //     state.error = null;
        // })
        // .addCase(createNewDeliveryOrder.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.order = action.payload;
        // })
        // .addCase(createNewDeliveryOrder.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // })

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

export default uberDirectSlice.reducer;
