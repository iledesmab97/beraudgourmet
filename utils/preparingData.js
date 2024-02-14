import { ROLES } from '@/config/user'

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