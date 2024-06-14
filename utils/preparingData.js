import { ROLES } from '@/config/user'

const sameProperties = [ 'name', 'email', 'promotion', 'verified']
const regExpIngredientsOut = /\~(.*?)\~/g
const regExpSize = /\((.*?)\)/

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

export function extractElements(text) {
    const allElements = text.split(", ")
    const genericPizza = [allElements[0], allElements[1]].join(', ')
    const pizza =  allElements[0]
    const destructuringX = pizza.split(" x ")
    const quantityPizza = destructuringX[0]
    const name = destructuringX[1].split(' (')[0]
    const masaType = allElements[1]
    const size = [...text.match(regExpSize)][1]
    const extraIngredients = allElements.filter((item, index) => (index > 1) && !item.includes('~')).map(item => {
        const itemDivided = item.split('x ')
        return {
            quantity: itemDivided[0],
            name: itemDivided[1]
        }
    })
    const ingredientsOut = extractIngredientsOut(text)
    return {
        ingredientsOut,
        extraIngredients,
        pizza: {
            name,
            masaType,
            size,
            quantityPizza
        },
        genericPizza
    }
}

export function descriptionWithoutIngredientsOut(description) {
    const allElements = description.split(", ")
    const descriptionWithOutIngredientsOut = allElements.filter(item => !item.includes('~')).join(', ')
    return descriptionWithOutIngredientsOut
}

export function isSamePizza(pizza1, pizza2) {
    for (let property in pizza1) {
        if (property !== 'ingredients' || property !== 'price') {
            if (pizza1[property] !== pizza2[property]) return false
        } else if (property === 'ingredients') {
            if (pizza1[property].length !== pizza2[property].length ) return false
            for (let ingredient of pizza1[property]) {
                if (!pizza2[property].includes(ingredient)) return false
            }
        } else if (property === 'price') {
            if (Object.keys(pizza1.price).length !== Object.keys(pizza2.price).length) return false
            for (let [size, masses] of Object.entries(pizza1.price)) {
                if ( !(size in pizza2.price) ) return false
                if ( Object.keys(masses).length !== Object.keys(pizza2.price[size]).length) return false
                for (let [mass, cost] of Object.entries(masses) ) {
                    if ( !(mass in pizza2.price[size]) ) return false
                    if ( cost !== pizza2.price[size][mass] ) return false
                }
            }
        }
    }
    return true
}

export function isSameArray(array1, array2) {
    if (array1.length !== array2.length) return false
    for (let element of array1) {
        if (!array2.includes(element)) return false
    }
    return true
}

export function deepEqual(value1, value2) {
    if (typeof value1 !== typeof value2) return false
    if (typeof value1 !== 'object') {
        return value1 === value2
    } else {
        if ( value1 === null || value2 === null) {
            return value1 === value2
        }
        if (Object.keys(value1).length !== Object.keys(value2).length) return false
        for (let property in value1) {
            const isSame = deepEqual(value1[property], value2[property])
            if (!isSame) return false
        }
        return true
    }
}

export function listStores(storeList) {
    const arrayStoreList = []
    if (Object.keys(storeList).length) {
        for (let city in storeList) {
            storeList[city].stores.forEach(store => {
                const newStore = {
                    ...store,
                    city
                }
                arrayStoreList.push(newStore)
            })
        }
    }
    return arrayStoreList
}

export function requestSettings(requestType, token, typeFile) {
    let userToken
    if (token) {
        userToken = token
    } else {
        userToken = localStorage.getItem('user')
        if (userToken) {
            userToken = JSON.parse(userToken)
        }
    }    
    let setting
    switch (requestType) {
        case 'GET': {
            setting = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'verification-token': userToken
                }
            }
            break
        }
        case 'POST': {
            if (typeFile === 'image') {
                setting = {
                    method: 'POST',
                    headers: {
                        'verification-token': userToken
                    }
                }
            } else {
                setting = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'verification-token': userToken
                    }
                }
            }
            break
        }
        case 'PUT': {
            setting = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'verification-token': userToken
                }
            }
            break
        }
        case 'DELETE': {
            setting = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'verification-token': userToken
                }
            }
            break
        }
        default: {
            setting = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'verification-token': userToken
                }
            }
            break
        }
    }
    return setting ? setting : {}
}

export function deepUnequal(value1, value2) {
    const differences = {}
    
    if (value1.totalCost !== value2.totalCost) {
        differences.totalCost = value1.totalCost
    }

    if (value1.totalCostByItems !== value2.totalCostByItems) {
        differences.totalCostByItems = value1.totalCostByItems
    }

    const itemsxOrderDifference = []

    for (let order of value1.itemsxOrder) {
        const differentProperties = {}
        const order2 = value2.itemsxOrder.find( o => o.id === order.id)
        if (!order2) {
            itemsxOrderDifference.push(order)
            continue
        }
        for (let property in order) {
            if (!deepEqual(order[property], order2[property])) {
                differentProperties[property] = order[property]
            }
        }

        if (Object.keys(differentProperties).length) {
            itemsxOrderDifference.push({...differentProperties, id: order.id})
        }
    }

    const currentOrdersListId = value1.itemsxOrder.map(order => order.id)
    const ordersToRemove = value2.itemsxOrder.filter(order => !currentOrdersListId.includes(order.id))

    for (let order of ordersToRemove) {
        itemsxOrderDifference.push({
            id: order.id,
            remove: true
        })
    }

    if (itemsxOrderDifference.length) {
        differences.itemsxOrder = itemsxOrderDifference
    }

    if (Object.keys(differences).length) {
        differences.id = value1.id
    }

    return differences
}