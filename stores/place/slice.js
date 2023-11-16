import { createSlice } from "@reduxjs/toolkit"

const place = {
    email: '',
    name: '',
    phone: '',
    password: '',
    notifications: ''
}

const initialState = {}

export const placeSlice = createSlice({
    name: 'place',
    initialState,
    reducers: {
        addPlace: (state, action) => {
            return action.payload
        },
        removePlace: (state, action) => {
            return {}
        }
    }
})

export default placeSlice.reducer

export const { addPlace, removePlace} = placeSlice.actions