import { createSlice } from "@reduxjs/toolkit"

const place = {
    email: '',
    name: '',
    phone: '',
    password: '',
    notifications: ''
}

const initialState = {
    direction: 'Ciudad de México',
    marker: {
        lat: 4678,
        lg: 5462,
    }
}

export const placeSlice = createSlice({
    name: 'place',
    initialState,
    reducers: {}
})

export default placeSlice.reducer

// export const {increment, decrement} = usersSlice.actions