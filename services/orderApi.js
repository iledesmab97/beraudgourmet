import { requestSettings } from '@/utils/preparingData'

const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK

export function getAllOrders(userId) {
    const lastPath = userId ? `/${userId}` : ''
    return fetch(`${PATH_BACK}/orders${lastPath}`, {
        ...requestSettings(),
        cache: 'no-store'
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) throw new Error(data.message)
            return data
        })
        .catch(error => ({message: error.message}))
}

export function updateOrder(id, body) {
    return fetch(`${PATH_BACK}/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify(body),
    })
        .then(res => res.json())
        .then(data => data)
}

export async function sendImage(id, formData) {
    return fetch(`${PATH_BACK}/orders/image/${id}`, {
        method: 'POST',
        body: formData,
    })
}

export async function registerOrder(data) {
    return fetch(`${PATH_BACK}/orders`, {
        ...requestSettings('POST'),
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            if (data.message) throw new Error(data.message)
            console.log('La orden fue creada exitosamente')
            return data
        })
        .catch(error => ({message: error.message}))
}

export function requestRemovalOrder(id) {
    if (!id) throw new Error('id can not be undefined')
    return fetch(`${PATH_BACK}/orders/${id}`, {
        method: 'DELETE',
        credentials: "include",
    })
        .then(res => res.json())
        .then(data => {
            if (data.message) throw new Error(data.message)
            console.log('La orden fue removida exitosamente')
            return data
        })
        .catch(error => ({message: error.message}))
}