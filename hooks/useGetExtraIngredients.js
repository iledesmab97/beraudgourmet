import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { addExtraIngredientsList, addExtraIngredient, removeExtraIngredient, updateExtraIngredient } from '@/stores/extraIngredients/slice'

export default function useGetExtraIngredients() {

    const extraIngredients = useAppSelector(state => state.extraIngredients)
    const dispatch = useAppDispatch()

    function handleAddExtraIngredinetsList({extraIngredientsList}) {
        dispatch(addExtraIngredientsList({extraIngredientsList}))
    }

    function handleUpdateExtraIngredient(extraIngredientUpdated) {
        dispatch(updateExtraIngredient(extraIngredientUpdated))
    }

    function handleAddExtraIngredient(newExtraIngredient) {
        dispatch(addExtraIngredient(newExtraIngredient))
    }

    function handleRemoveExtraIngredient(extraIngredientToRemove) {
        dispatch(removeExtraIngredient(extraIngredientToRemove))
    }
    
    return { extraIngredients, handleAddExtraIngredinetsList, handleUpdateExtraIngredient, handleAddExtraIngredient, handleRemoveExtraIngredient }
}