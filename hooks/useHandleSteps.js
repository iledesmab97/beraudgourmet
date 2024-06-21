import { useEffect } from "react"
import useGetSteps from '@/hooks/useGetSteps'
import useGetUser from '@/hooks/useGetUser'
import useGetOrders from '@/hooks/useGetOrders'
import useGetPlace from '@/hooks/useGetPlace'

function useHandleSteps() {

    const { steps, handleSteps } = useGetSteps()
    const { user } = useGetUser()
    const { orders } = useGetOrders()
    const { place } = useGetPlace()

    useEffect(() => {
        const newSteps = { ...steps }
        if (Boolean(user.email) !== steps.user) {
            newSteps.user = Boolean(user.email)
        }
        if (Boolean(orders.length) !== steps.orders) {
            newSteps.order = Boolean(orders.length)
        }
        if (Boolean(Object.keys(place).length) !== steps.store) {
            newSteps.store = Boolean(Object.keys(place).length)
        }
        handleSteps(newSteps)
    }, [user, orders, place])

    return steps
}   

export default useHandleSteps