import { ROLES } from '@/config/user'

const sameProperties = [ 'name', 'email', 'promotion', 'verified']

export function userDataFromBackToFront(userBack) {
    const {id, name, email, phoneNumber, promotion, verified, RoleId} = userBack
    const userFront = {
        id,
        name,
        email,
        numberPhone: phoneNumber,
        promotion,
        verified,
        role: ROLES[RoleId -1]
    }
    return userFront
}

export function userDataFromFrontToBack(userFront) {
    const { name, email, password, numberPhone } = userFront
    const userBack = {
        name,
        email,
        password,
        phoneNumber: numberPhone.replaceAll(" ", ""),
    }
    return userBack
}

export function oneUserDataFromFrontToBack(propertyFront) {
    const { property } = propertyFront
    if (sameProperties.includes(property)) return propertyFront
    else if ( property === 'numberPhone' ) return { ...propertyFront, property: 'numberPhone' }
    return propertyFront
}