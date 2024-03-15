const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK

export function getAllOrders(userId) {
    const lastPath = userId ? `/${userId}` : ''
    return fetch(`${PATH_BACK}/orders${lastPath}`, { cache: 'no-store' })
        .then(response => response.json())
        .then(data => {
            if (data.message) return console.log('Ha ocurrido el siguiente error:', data.message)
            return data
        })
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
    fetch(`${PATH_BACK}/orders`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            if (data.message) throw new Error(data.message)
            console.log('La orden fue creada exitosamente')
            return data
        })
        .catch(error => alert(error.message))
}