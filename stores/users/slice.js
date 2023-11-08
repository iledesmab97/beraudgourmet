import { createSlice } from "@reduxjs/toolkit"

const users = {
    email: '',
    name: '',
    phone: '',
    password: '',
    notifications: ''
}

const initialState = {
    email: 'troy00pernia@gmail.com',
    name: 'Troy De Jesús Pernía Bruzual',
    phone: '+58 412 0146661'
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export default usersSlice.reducer

// export const {increment, decrement} = usersSlice.actions