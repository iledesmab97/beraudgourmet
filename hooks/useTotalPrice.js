import { useMemo } from "react"
import { twoDecimals } from '@/genericFunctions/priceCar'

function useTotalPrice(orders) {

    const totalPriceCar = useMemo(() => {
        return orders.reduce((acc, cur) => {
            return acc + cur.totalPrice
        }, 0)
    }, [orders])

    function calculateTotalPay(totalCard) {
        if (totalCard === 0) return {totalClient: '0.00'}
        const tasaIVA = 0.16
        const commissionStripe = totalCard*0.036 + 3
        const IVA = (commissionStripe) * tasaIVA
        const totalClient = totalCard + commissionStripe + IVA
        return ({
            totalPriceCar: twoDecimals(totalCard),
            commissionStripe: twoDecimals(commissionStripe),
            IVA: twoDecimals(IVA),
            totalClient: twoDecimals(totalClient)
        })
    }

    return calculateTotalPay(totalPriceCar)
}

export default useTotalPrice