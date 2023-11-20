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