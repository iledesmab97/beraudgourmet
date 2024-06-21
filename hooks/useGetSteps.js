import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { changeStep } from '@/stores/steps/slice'

export default function useGetSteps() {

    const steps = useAppSelector(state => state.steps)
    const dispatch = useAppDispatch()

    function handleSteps(newData) {
        dispatch(changeStep(newData))
    }

    return { steps, handleSteps }
} 