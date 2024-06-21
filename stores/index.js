import { configureStore } from "@reduxjs/toolkit"
import userReducer from './user/slice'
import ordersReducer from './order/slice'
import placeReducer from './place/slice'
import modalReducer from './modal/slice'
import checkoutReducer from './checkout/slice'
import storeListReducer from './storeList/slice'
import productsReducer from './products/slice'
import extraIngredientsReducer from './extraIngredients/slice'
import alertMessageReducer from './alertMessage/slice'
import alertDialogMessageReducer from './alertDialogMessage/slice'
import orderListReducer from './orderList/slice'
import stepsReducer from './steps/slice'
import drawerReducer from './drawer/slice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        orders: ordersReducer,
        place: placeReducer,
        modal: modalReducer,
        checkout: checkoutReducer,
        storeList: storeListReducer,
        products: productsReducer,
        extraIngredients: extraIngredientsReducer,
        alertMessage: alertMessageReducer,
        alertDialogMessage: alertDialogMessageReducer,
        orderList: orderListReducer,
        steps: stepsReducer,
        drawer: drawerReducer
    }
})