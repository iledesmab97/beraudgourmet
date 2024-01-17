export function twoDecimals(number) {
    const stringNumber = String(number)
    const arrayStringNumber = stringNumber.split('.')
    const numberBefore = arrayStringNumber[0]
    let numberAfter = arrayStringNumber[1]
    if (!numberAfter) {
        numberAfter = '00'
    } else if (numberAfter && numberAfter.length > 2) {
        numberAfter = numberAfter.slice(0,2)
    } else if (numberAfter.length === 1) {
        numberAfter = numberAfter + '0'
    }
    return numberBefore + '.' + numberAfter
}

export function calculateTotalPay(totalCar) {
    if (totalCar === 0) return {totalClient: '0.00'}
    const tasaIVA = 0.16
    const commissionStripe = totalCar*0.036 + 3
    const IVA = (commissionStripe) * tasaIVA
    const totalClient = totalCar + commissionStripe + IVA
    return ({
        totalPriceCar: twoDecimals(totalCar),
        commissionStripe: twoDecimals(commissionStripe),
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