import { createSlice } from "@reduxjs/toolkit"

const user = {
    email: '',
    name: '',
    phone: '',
    password: '',
    notifications: ''
}

const initialState = {
    email: '',
    password: '',
    name: '',
    numberPhone: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            return {
                email: action.payload.email,
                password: action.payload.password,
                name: action.payload.name,
                numberPhone: action.payload.numberPhone
            }
        },
        removeUser: (state, action) => {
            return initialState
        }
    }
})

export default userSlice.reducer

export const { addUser, removeUser } = userSlice.actions