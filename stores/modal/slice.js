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
    },
    storesDetail: {
        open: false
    },
    user: {
        open: false
    },
    changePassword: {
        open: false
    },
    changeEmail: {
        open: false
    },
    pay: {
        open: false
    }
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {

        openModal: (state, action) => {
            return {
                ...state,
                [action.payload]: {
                    ...state[action.payload],
                    open: true
                }
            }
        },
        closeModal: (state, action) => {
            return {
                ...state,
                [action.payload]: {
                    ...state[action.payload],
                    open: false
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
            if (state.order[action.payload.name]) {
                return {
                    ...state,
                    order: {
                        ...state.order,
                        open:true,
                        currentProduct: action.payload.name
                    }
                }
            }
            return {
                ...state,
                order: {
                    ...state.order,
                    [action.payload.name]: action.payload,
                    open: true,
                    currentProduct: action.payload.name
                }
            }
        },
        closeModalOrder: (state, action) => {
            const newState = {
                ...state,
                order: {
                    ...state.order,
                    open: false,
                }
            }
            return newState
        },
        updateModalOrder: (state, action) => {
            const nameProduct = state.order.currentProduct
            return {
                ...state,
                order: {
                    ...state.order,
                    [nameProduct]: action.payload
                }
            }
        }
    }
})

export default modalSlice.reducer

export const {
    openModal,
    closeModal,
    closeModalPlace,
    openModalOrder,
    closeModalOrder,
    updateModalOrder
} = modalSlice.actions