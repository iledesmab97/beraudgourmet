const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK

export function addIngredient(name) {
    return fetch(`${PATH_BACK}/pizzaIngredients`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({name})
    })
        .then(response => {
            return response.json()
        })
        .then(response => {
            if (response.message) throw new Error(response.message)
            return response
        })
        .catch(error => {
            return {message: error.message}
        })
}