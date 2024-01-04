import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { addExtraIngredientsList } from '@/stores/extraIngredients/slice'

export default function useGetExtraIngredients() {

    const extraIngredients = useAppSelector(state => state.extraIngredients)
    const dispatch = useAppDispatch()

    function handleAddExtraIngredinetsList({extraIngredientsList}) {
        dispatch(addExtraIngredientsList({extraIngredientsList}))
    }
    
    return { extraIngredients, handleAddExtraIngredinetsList }
}