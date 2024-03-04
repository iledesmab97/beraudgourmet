import { ROLES } from '@/config/user'

const sameProperties = [ 'name', 'email', 'promotion', 'verified']
const regExpIngredientsOut = /\~(.*?)\~/g

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
    else if ( property === 'numberPhone' ) return { ...propertyFront, property: 'phoneNumber' }
    return propertyFront
}

export function descriptionOrder(order) {
    const primrayData = order.quantity + ' x ' + order.name + ` (${order.size})`
    const extraIngredients = `${order.mass}${Object.keys(order.extra).map(ingredient => {
        return `, ${order.extra[ingredient]}x ${ingredient}`
        }).join('')
        }`
    const ingredientsOut = order.ingredientsModal.map( ingredient => `~${ingredient}~` ).join(', ')
    return primrayData + (extraIngredients ? ', ' : '') + extraIngredients + (ingredientsOut ? ', ' : '') + ingredientsOut
}

export function extractIngredientsOut(text) {
    const resultados = [...text.matchAll(regExpIngredientsOut)]
    return resultados.map(ingredient => ingredient[1])
}