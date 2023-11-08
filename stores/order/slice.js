import { createSlice } from "@reduxjs/toolkit"

const order = {
    email: '',
    name: '',
    phone: '',
    password: '',
    notifications: ''
}

const initialState = [
    {
        pizza: 'margarita',
        quatity: 2,
        price: 10,
        totalPrice: 20
    }
]

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {}
})

export default ordersSlice.reducer

// export const {increment, decrement} = usersSlice.actions