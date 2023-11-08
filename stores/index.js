import { configureStore } from "@reduxjs/toolkit"
import usersReducer from './users/slice'
import ordersReducer from './order/slice'
import placeReducer from './place/slice'

export const store = configureStore({
    reducer: {
        users: usersReducer,
        orders: ordersReducer,
        place: placeReducer
    }
})