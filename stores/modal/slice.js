import { createSlice } from "@reduxjs/toolkit"

const modal = {
    email: '',
    name: '',
    phone: '',
    password: '',
    notifications: ''
}

const initialState = ''

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            return action.payload
        },
        closeModal: (state, action) => {
            return ''
        }
    }
})

export default modalSlice.reducer

export const { openModal, closeModal } = modalSlice.actions