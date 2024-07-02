import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

export const extraIngredientsSlice = createSlice({
    name: 'extraIngredients',
    initialState,
    reducers: {
        addExtraIngredientsList: (state, action) => {
            const { extraIngredientsList } = action.payload
            return extraIngredientsList
        },
        addExtraIngredient: (state, action) => {
            const newExtraIngredient = action.payload
            const newState = {...state}
            newState[newExtraIngredient.name] = newExtraIngredient
            return newState
        },
        removeExtraIngredient: (state, action) => {
            const extraIngredientToRemove = action.payload
            const newState = {...state}
            delete newState[extraIngredientToRemove.name]
            return newState
        },
        updateExtraIngredient: (state, action) => {
            const extraIngredientUpdated = action.payload
            const newState = {...state}
            newState[extraIngredientUpdated.name] = extraIngredientUpdated
            return newState
        }
    }
})

export default extraIngredientsSlice.reducer

export const { addExtraIngredientsList, addExtraIngredient, removeExtraIngredient, updateExtraIngredient } = extraIngredientsSlice.actions