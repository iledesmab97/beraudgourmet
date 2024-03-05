const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK

export function getAllOrders() {
    return fetch(`${PATH_BACK}/orders`)
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