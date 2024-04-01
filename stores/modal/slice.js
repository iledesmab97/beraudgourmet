import { createSlice } from "@reduxjs/toolkit"

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
    deliveryPlace: {
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
    },
    userOrders: {
        open: false
    },
    legal: {
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
            const {item, index} = action.payload
            if (index) {
                return {
                    ...state,
                    order: {
                        ...state.order,
                        open:true,
                        edit: {
                            item,
                            index
                        }
                    }
                }
            }
            if (state.order[action.payload.item.name]) {
                return {
                    ...state,
                    order: {
                        ...state.order,
                        open:true,
                        currentProduct: item.name
                    }
                }
            }
            return {
                ...state,
                order: {
                    ...state.order,
                    [item.name]: item,
                    open: true,
                    currentProduct: item.name
                }
            }
        },
        closeModalOrder: (state, action) => {
            const newState = {
                ...state,
                order: {
                    ...state.order,
                    open: false,
                    edit: null 
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
        },
        updateModalToInitialState: (state, action) => {
            return initialState
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
    updateModalOrder,
    updateModalToInitialState
} = modalSlice.actions