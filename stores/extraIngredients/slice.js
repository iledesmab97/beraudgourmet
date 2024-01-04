import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

export const extraIngredientsSlice = createSlice({
    name: 'extraIngredients',
    initialState,
    reducers: {
        addExtraIngredientsList: (state, action) => {
            const { extraIngredientsList } = action.payload
            return extraIngredientsList
        }
    }
})

export default extraIngredientsSlice.reducer

export const { addExtraIngredientsList } = extraIngredientsSlice.actions