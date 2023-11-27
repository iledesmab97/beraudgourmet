import { configureStore } from "@reduxjs/toolkit"
import userReducer from './user/slice'
import ordersReducer from './order/slice'
import placeReducer from './place/slice'
import modalReducer from './modal/slice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        orders: ordersReducer,
        place: placeReducer,
        modal: modalReducer
    }
})