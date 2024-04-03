import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProductsList: (state, action) => {
            const { type, products } = action.payload
            if (state[type]) {
                const productsFitered = products.filter( product => {
                    return !state[type].some(producIncluded => producIncluded.name === product.name)
                } )
                return {
                    ...state,
                    [type]: [...state[type], ...productsFitered]
                }
            } else {
                return {
                    ...state,
                    [type]: [...products]
                }
            }
        },
        updateProductsList: (state, action) => {
            const { type, newProductList } = action.payload
            return {
                ...state,
                [type]: newProductList
            }
        }
    }
})

export default productsSlice.reducer

export const { addProductsList, updateProductsList } = productsSlice.actions