import { createSlice } from "@reduxjs/toolkit"

const modal = {
    email: '',
    name: '',
    phone: '',
    password: '',
    notifications: ''
}

const initialState = {
    order: {
        open: false
    },
    place: {
        open: false
    }
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModalPlace: (state, action) => {
            return {
                ...state,
                place: {
                    ...state.place,
                    open: true
                }
            }
        },
        closeModalPlace: (state, action) => {
            return {
                ...state,
                place: {
                    ...state.place,
                    open: false
                }
            }
        },
        openModalOrder: (state, action) => {
            const newState = {
                ...state,
                order: {
                    ...state.order,
                    [action.payload.name]: action.payload,
                    open: true,
                    currentProduct: action.payload
                }
            }
            return newState
        },
        closeModalOrder: (state, action) => {
            return {
                ...state,
                order: {
                    ...state.order,
                    open: false
                }
            }
        }
    }
})

export default modalSlice.reducer

export const { openModalPlace, closeModalPlace, openModalOrder, closeModalOrder } = modalSlice.actions