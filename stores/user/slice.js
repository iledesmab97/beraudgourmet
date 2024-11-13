import { createSlice } from "@reduxjs/toolkit";
import { verifyUserAction, updateUserAction } from "../actions/users";

const initialState = {};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            return action.payload;
        },
        removeUser: (state, action) => {
            return initialState;
        },
        updateUser: (state, action) => {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyUserAction.pending, (state) => {
                state.status = "loading";
            })
            .addCase(verifyUserAction.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = "succeeded";
            })
            .addCase(verifyUserAction.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updateUserAction.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateUserAction.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = "succeeded";
            })
            .addCase(updateUserAction.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;

export const { addUser, removeUser, updateUser, addCard } = userSlice.actions;
