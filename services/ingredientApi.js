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

export function removeIngredient({id, name}) {
    if (id) {
        return fetch(`${PATH_BACK}/pizzaIngredients/${id}`, {
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
            .catch(error => {
                return {message: error.message}
            })
    }
    else if (name) {
        return fetch(`${PATH_BACK}/pizzaIngredients`, {
            method: 'DELETE',
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
}