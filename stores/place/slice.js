import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const placeSlice = createSlice({
    name: "place",
    initialState,
    reducers: {
        addPlace: (state, action) => {
            const newProps = Object.keys(action.payload);
            const newPlace = { ...state };
            newProps.forEach((prop) => {
                newPlace[prop] = action.payload[prop];
            });
            return newPlace;
        },
        removePlace: (state, action) => {
            const place = action.payload.place;
            return {
                ...state,
                [place]: null,
            };
        },
        addDeadLine: (state, action) => {
            if (!state.deadLine) {
                return {
                    ...state,
                    deadLine: {
                        [action.payload.property]: action.payload.value,
                    },
                };
            }
            return {
                ...state,
                deadLine: {
                    ...state.deadLine,
                    [action.payload.property]: action.payload.value,
                },
            };
        },
        addTypeDelivery: (state, action) => {
            const { name, totalName } = action.payload;
            return {
                ...state,
                typeDelivery: { name, totalName },
            };
        },
        updatePlaceToInitialState: (state, action) => {
            return initialState;
        },
    },
});

export default placeSlice.reducer;

export const {
    addPlace,
    removePlace,
    addDeadLine,
    addTypeDelivery,
    updatePlaceToInitialState,
} = placeSlice.actions;
