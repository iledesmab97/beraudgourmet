import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id: '',
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
            return action.payload
        },
        removeUser: (state, action) => {
            return initialState
        },
        updateUser: (state, action) => {
            return action.payload
        }
    }
})

export default userSlice.reducer

export const { addUser, removeUser, updateUser, addCard } = userSlice.actions