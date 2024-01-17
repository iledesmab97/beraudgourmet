export function verifyEmailUser(token) {
    return fetch(`http://localhost:3000/api/users/verify/${token}`)
        .then(response => response.json())
        .then(data => {
            if (data.message) return { message: data.message}
            return data[0] >= 1 ? true : false
        })
}

export function fetchwhoAmI() {
    return fetch('http://localhost:3000/api/users/loged')
        .then(response => response.json())
        .then(data => {
            if (data.message) return null
            return data
        })
}