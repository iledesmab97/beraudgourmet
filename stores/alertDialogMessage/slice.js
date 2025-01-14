import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    phoneMissing: {
        name: "phoneMissing",
        open: false,
    },
    acceptCookies: {
        name: "acceptCookies",
        open: false,
    },
    recoverPassword: {
        name: "recoverPassword",
        open: false,
    },
    changePassword: {
        name: "changePassword",
        open: false,
    },
    errorAlert: {
        name: "errorAlert",
        open: false,
        numberOpened: 0,
    },
};

export const alertDialogMessageSlice = createSlice({
    name: "alertDialogMessage",
    initialState,
    reducers: {
        openDialogMessage: (state, action) => {
            const dialogMessage = action.payload;
            return {
                ...state,
                [dialogMessage.name]: {
                    ...dialogMessage,
                    open: true,
                },
            };
        },
        closeDialogMessage: (state, action) => {
            const dialogMessage = action.payload;
            return {
                ...state,
                [dialogMessage.name]: {
                    ...dialogMessage,
                    open: false,
                },
            };
        },
        updateDialogMessage: (state, action) => {
            const newDialogMessage = action.payload;
            console.log("newDialogMessage:", newDialogMessage);
            return {
                ...state,
                [newDialogMessage.name]: newDialogMessage,
            };
        },
    },
});

export default alertDialogMessageSlice.reducer;

export const { openDialogMessage, closeDialogMessage, updateDialogMessage } =
    alertDialogMessageSlice.actions;
