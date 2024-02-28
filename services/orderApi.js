const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK

export function getAllOrders() {
    return fetch(`${PATH_BACK}/orders`)
        .then(response => response.json())
        .then(data => {
            if (data.message) return console.log('Ha ocurrido el siguiente error:', data.message)
            return data
        })
}