import { requestSettings } from '@/utils/preparingData'

const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK

export function addIngredient(name) {
    return fetch(`${PATH_BACK}/ingredients`, {
        ...requestSettings('POST'),
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
        return fetch(`${PATH_BACK}/ingredients/${id}`, {
            ...requestSettings('DELETE')
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
        return fetch(`${PATH_BACK}/ingredients`, {
            ...requestSettings('DELETE'),
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