import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchwhoAmI,
    newAccount,
    requestLogout,
    searchUser,
    verifyUserData,
    updateMyAccount,
} from "@/services/userApi";
import { updatePlaceToInitialState } from "../place/slice.js";
import { updateOrderToInitialState } from "../order/slice.js";

import { removeLocalData, saveLocalData } from "@/utils/manageLocalStorage.js";

export const verifyUserAction = createAsyncThunk(
    "user/verifyUser",
    async ({ tokenUser, save }, { rejectWithValue }) => {
        let user;
        try {
            if (!tokenUser) throw new Error("No user logged in");
            user = await fetchwhoAmI(tokenUser);
            if (save) {
                saveLocalData("user", tokenUser);
            }
            return user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logOutUserAction = createAsyncThunk(
    "user/logoutUser",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await requestLogout();
            if (response.message)
                throw new Error("Unable to logout: " + response.message);
            removeLocalData("user");
            removeLocalData("orders");
            removeLocalData("place");
            removeLocalData("countdownTimer");
            removeLocalData("expirationDate");
            removeLocalData("uberToken");
            removeLocalData("quote");
            dispatch(updatePlaceToInitialState());
            dispatch(updateOrderToInitialState());
            return;
        } catch (error) {
            alert(error.message);
            return rejectWithValue(error.message);
        }
    }
);

export const signupUserAction = createAsyncThunk(
    "user/signupUser",
    async ({ email, name, password, numberPhone }, { rejectWithValue }) => {
        try {
            const { user, token } = await newAccount({
                email,
                name,
                password,
                numberPhone,
            });
            saveLocalData("user", token);
            return user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logInUserAction = createAsyncThunk(
    "user/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { user, token } = await verifyUserData(email, password);
            saveLocalData("user", token);
            return user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const searchUserAction = createAsyncThunk(
    "user/searchUser",
    async ({ email }, { rejectWithValue }) => {
        try {
            const data = await searchUser(email);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUserAction = createAsyncThunk(
    "user/updateUser",
    async (properties, { rejectWithValue }) => {
        try {
            const user = await updateMyAccount(properties);
            return user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
