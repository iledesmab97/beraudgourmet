const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK

export function getAllStores() {
    return fetch(`${PATH_BACK}/stores`)
        .then(response => response.json())
        .then(data => {
        const newData = data.map(store => ({
            id: store.id,
            name: store.name,
            place: store.address,
            city: store.city,
            phone: store.phoneNumber,
            coordinates: store.coordinates
        }))
        return newData
        })
}