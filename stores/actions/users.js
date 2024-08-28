import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    lookingForUserLoged,
    requestLogout,
    searchUser,
    verifyUserData,
    saveToken,
} from "@/services/userApi";
import { updatePlaceToInitialState } from "../place/slice.js";
import { updateOrderToInitialState } from "../order/slice.js";
import { removeLocalData, saveLocalData } from "./manageLocalStorage.js";
import { userDataFromBackToFront } from "@/utils/preparingData.js";

export const verifyUserAction = createAsyncThunk(
    "user/verifyUser",
    async (searchParams, { rejectWithValue }) => {
        const tokenUser = searchParams.get("tokenUser");
        try {
            let user;
            if (tokenUser) {
                user = await saveToken(tokenUser);
            } else {
                const token = JSON.parse(localStorage.getItem("user"));
                const cookies = JSON.parse(
                    localStorage.getItem("acceptCookies")
                );

                if (!cookies) {
                    localStorage.setItem("acceptCookies", false);
                }

                if (!token) {
                    return rejectWithValue("No user logged in");
                }

                user = await lookingForUserLoged(token);
                if (user.message) {
                    throw new Error(user.message);
                }
            }
            return user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logOutUser = createAsyncThunk(
    "user/logoutUser",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await requestLogout();
            if (response.message)
                throw new Error("Unable to logout: " + response.message);
            localStorage.removeItem("user");
            removeLocalData("orders");
            removeLocalData("place");
            removeLocalData("user");
            dispatch(updatePlaceToInitialState());
            dispatch(updateOrderToInitialState());
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logInUserAction = createAsyncThunk(
    "user/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            if (!email)
                throw {
                    key: "email",
                    message: "El email no puede estar vacio",
                };
            if (!password)
                throw {
                    key: "password",
                    message: "La contraseña no puede estar vacia",
                };
            const response = await verifyUserData(email, password);
            saveLocalData("user", response.token);
            const userFront = userDataFromBackToFront(response.user);
            return userFront;
        } catch (error) {
            return rejectWithValue({ key: error.key, message: error.message });
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
