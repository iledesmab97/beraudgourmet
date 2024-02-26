export function twoDecimals(number) {
    const stringNumber = String(Math.ceil(number))
    const arrayStringNumber = stringNumber.split('.')
    const numberBefore = arrayStringNumber[0]
    // const numberAfter = '00'
    // let numberAfter = arrayStringNumber[1]
    // if (!numberAfter) {
    //     numberAfter = '00'
    // } else if (numberAfter && numberAfter.length > 2) {
    //     numberAfter = numberAfter.slice(0,2)
    // } else if (numberAfter.length === 1) {
    //     numberAfter = numberAfter + '0'
    // }
    // return numberBefore + '.' + numberAfter
    return numberBefore
}

export function calculateTotalPay(totalCar) {
    if (totalCar === 0) return {totalClient: '0.00'}
    const tasaIVA = 0.16
    const commissionIVA = totalCar * tasaIVA
    // const commissionStripe = totalCar * 0.036 + 3
    const commissionStripe = (totalCar + commissionIVA) * 0.036 + 3
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

export function totalPrice(orders) {
    const totalPriceCar = orders.reduce((acc, cur) => {
        return acc + cur.totalPrice
    }, 0)
    return calculateTotalPay(totalPriceCar)
}