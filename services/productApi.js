import { twoDecimals } from '@/utils/priceCar'
const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK

export function getPizzas() {
  return fetch(`${PATH_BACK}/pizzas`)
    .then(response => response.json())
    .then(data => {
      const pizzaList = data.map(pizza => {
          const { id, name, text, image, ingredients } = pizza
          const newPizzaData = {
            id,
            name,
            text,
            image,
            ingredients
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
          const { id, cost, costIVA, pizza, pizzaCharacteristics } = pizzaCost
          const newPizzaCost = {
            id,
            cost,
            costIVA: twoDecimals(costIVA),
            pizza,
            pizzaCharacteristics
          }
          return newPizzaCost
        })
        if (type === 'object') {
          const listCostsObject = {}
          pizzaCostsList.forEach(pizzaCost => {
            const { costIVA, pizza, pizzaCharacteristics } = pizzaCost
            const { mass, size } = pizzaCharacteristics
  
            if (listCostsObject[pizza]) {
              // cost per mass
              const costPerMass = {
                ...listCostsObject[pizza][size],
                [mass]: costIVA
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
                [mass]: costIVA
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
        const {id, name, cost} = extraIngredient
        extraIngredinetList[name] = {
          id,
          name,
          price: cost
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
    method: 'PUT',
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