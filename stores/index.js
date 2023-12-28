import { configureStore } from "@reduxjs/toolkit"
import userReducer from './user/slice'
import ordersReducer from './order/slice'
import placeReducer from './place/slice'
import modalReducer from './modal/slice'
import checkoutReducer from './checkout/slice'
import storeListReducer from './storeList/slice'
import productsReducer from './products/slice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        orders: ordersReducer,
        place: placeReducer,
        modal: modalReducer,
        checkout: checkoutReducer,
        storeList: storeListReducer,
        products: productsReducer
    }
})