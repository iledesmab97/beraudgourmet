import { twoDecimals } from '@/utils/priceCar'
import { requestSettings } from '@/utils/preparingData'

const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK

export function getPizzas() {
  return fetch(`${PATH_BACK}/pizzas`)
    .then(response => response.json())
    .then(data => {
      const pizzaList = data.map(pizza => {
          const { id, name, text, image, ingredients, status  } = pizza
          const newPizzaData = {
            id,
            name,
            text,
            image,
            ingredients,
            status
          }
          return newPizzaData
      })
      return pizzaList
  })
}

export function getPizzaCosts({type}) {
    return fetch(`${PATH_BACK}/pizzaCosts`)
      .then(response => response.json())
      .then(data => {
        const pizzaCostsList = data.map(pizzaCost => {
          const { id, cost, costIVA, costIVAStripe, pizza, pizzaCharacteristics } = pizzaCost
          const newPizzaCost = {
            id,
            cost,
            costIVA: twoDecimals(costIVA),
            costIVAStripe,
            pizza,
            pizzaCharacteristics
          }
          return newPizzaCost
        })
        if (type === 'object') {
          const listCostsObject = {}
          pizzaCostsList.forEach(pizzaCost => {
            const { costIVAStripe, pizza, pizzaCharacteristics } = pizzaCost
            const { mass, size } = pizzaCharacteristics
  
            if (listCostsObject[pizza]) {
              // cost per mass
              const costPerMass = {
                ...listCostsObject[pizza][size],
                [mass]: costIVAStripe
              }
              // mass per size
              const massPerSize = {
                ...listCostsObject[pizza],
                [size]: costPerMass
              }
  
              listCostsObject[pizza] = massPerSize
  
            } else {
              // cost per mass
              const costPerMass = {
                [mass]: costIVAStripe
              }
              // mass per size
              const massPerSize = {
                [size]: costPerMass
              }
  
              listCostsObject[pizza] = massPerSize
            }
          })
          return listCostsObject
        }
        return pizzaCostsList
    })
}

export async function getExtraIngredients() {
  return fetch(`${PATH_BACK}/pizzaExtraIngredients`)
    .then(response => response.json())
    .then(data => {
      const extraIngredinetList = {}
      data.forEach(extraIngredient => {
        const {id, name, cost, costIVAStripe} = extraIngredient
        extraIngredinetList[name] = {
          id,
          name,
          price: cost,
          totalPrice: costIVAStripe
        }
      })
      return extraIngredinetList
  })
}

export async function getPizzasWithCosts() {
    const pizzasList = await getPizzas()
    const pizzaCharacteristicsList = await getPizzaCosts({type: 'object'})
    const totalPizzasList = pizzasList.map(pizza => ({
      ...pizza,
      price: pizzaCharacteristicsList[pizza.name]
    }))
    return totalPizzasList
}

export async function updatePizza(id, body) {
  return fetch(`${PATH_BACK}/pizzas/${id}`, {
    ...requestSettings('PUT'),
    body: JSON.stringify(body)
  })
    .then(response => {
      return response.json()
    })
    .then(response => {
      if (response.message) throw new Error(response.message)
      return response
    })
    .catch(error => ({message: error.message}))
}

export async function removePizza(id) {
  return fetch(`${PATH_BACK}/pizzas/${id}`, {
    ...requestSettings('DELETE')
  })
    .then(response => {
      return response.json()
    })
    .then(response => {
      if (response.message) throw new Error(response.message)
      return response
    })
    .catch(error => ({message: error.message}))
}

export async function getAllIngredients() {
  return fetch(`${PATH_BACK}/pizzaIngredients`)
    .then(response => response.json())
    .then(data => data)
}

export async function getAllExtraIngredients() {
  return fetch(`${PATH_BACK}/pizzaExtraIngredients`)
    .then(response => response.json())
    .then(data => data)
}

export async function addNewPizza(pizza) {
  return fetch(`${PATH_BACK}/pizzas`, {
    ...requestSettings('POST'),
    body: JSON.stringify(pizza)
  })
    .then(response => {
      return response.json()
    })
    .then(response => {
      if (response.message) throw new Error(response.message)
      return response
    })
    .catch(error => ({message: error.message}))
}

export async function sendImage(formData) {
  return fetch(`${PATH_BACK}/pizzas/image`, {
    ...requestSettings('POST', null, 'image'),
    body: formData,
})
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        return data
      } else {
        throw new Error(data.message)
      }
    })
    .catch(error => ({message: error.message, status: 'error'}))
}

export async function updateCharacteristicsPizza(id, body) {
  return fetch(`${PATH_BACK}/pizzaCosts/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(body)
  })
    .then(response => {
      return response.json()
    })
    .then(response => {
      if (response.message) throw new Error(response.message)
      return response
    })
    .catch(error => ({message: error.message}))
}

export function updateExtraIngredient(id, properties) {
  return fetch(`${PATH_BACK}/pizzaExtraIngredients/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(properties)
  })
    .then(response => {
      return response.json()
    })
    .then(response => {
      if (response.message) throw new Error(response.message)
      return response
    })
    .catch(error => ({message: error.message}))
}

export function makeExtraIngredient(properties) {
  return fetch(`${PATH_BACK}/pizzaExtraIngredients`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(properties)
  })
    .then(response => {
      return response.json()
    })
    .then(response => {
      if (response.message) throw new Error(response.message)
      return response
    })
    .catch(error => ({message: error.message}))
}

export function removeExtraIngredient(id) {
  return fetch(`${PATH_BACK}/pizzaExtraIngredients/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-type': 'application/json' },
  })
    .then(response => {
      return response.json()
    })
    .then(response => {
      if (response.message) throw new Error(response.message)
      return response
    })
    .catch(error => ({message: error.message}))
}