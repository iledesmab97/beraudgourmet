export function getAllStores() {
    return fetch('http://localhost:3000/api/stores')
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