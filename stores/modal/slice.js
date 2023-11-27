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
        },
        openModalStoresDetail: (state, action) => {
            return {
                ...state,
                storesDetail: {
                    ...state.storesDetail,
                    open: true
                }
            }
        },
        closeModalStoresDetail: (state, action) => {
            return {
                ...state,
                storesDetail: {
                    ...state.storesDetail,
                    open: false
                }
            }
        },
        openModalUser: (state, action) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    open: true
                }
            }
        },
        closeModalUser: (state, action) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    open: false
                }
            }
        }
    }
})

export default modalSlice.reducer

export const {
    openModalPlace,
    closeModalPlace,
    openModalOrder,
    closeModalOrder,
    updateModalOrder,
    openModalStoresDetail,
    closeModalStoresDetail,
    openModalUser,
    closeModalUser
} = modalSlice.actions