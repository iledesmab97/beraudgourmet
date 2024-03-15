export function twoDecimals(number) {
    const stringNumber = String(Math.ceil(number))
    const arrayStringNumber = stringNumber.split('.')
    const numberBefore = arrayStringNumber[0]
    return numberBefore
}

export function calculateTotalPay(totalCar, stripe) {
    if (totalCar === 0) return {
        totalClient: 0,
        totalPriceCar: 0
    }
    const tasaIVA = 0.16
    const commissionIVA = totalCar * tasaIVA
    // const commissionStripe = totalCar * 0.036 + 3
    const commissionStripe = stripe ? (totalCar + commissionIVA) * 0.036 + 3 : 0
    const IVA = (commissionStripe) * tasaIVA
    const totalClient = totalCar + commissionStripe + IVA
    return ({
        totalPriceCar: twoDecimals(totalCar),
        commissionIVA: twoDecimals(commissionIVA),
        commissionStripe: twoDecimals(commissionStripe + IVA),
        IVA: twoDecimals(IVA),
        totalClient: twoDecimals(totalClient)
    })
}

export function totalPrice(orders, stripe) {
    const totalPriceCar = orders.reduce((acc, cur) => {
        return acc + cur.totalPrice
    }, 0)
    return calculateTotalPay(totalPriceCar, stripe)
}