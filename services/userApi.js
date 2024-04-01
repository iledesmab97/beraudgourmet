import { userDataFromBackToFront } from '@/utils/preparingData'

const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK

export function verifyEmailUser(token) {
    return fetch(`${PATH_BACK}/users/verify/${token}`)
        .then(response => response.json())
        .then(data => {
            if (data.message) return { message: data.message}
            return data[0] >= 1 ? true : false
        })
}

export function fetchwhoAmI() {
    return fetch(`${PATH_BACK}/users/loged`, {
        method: 'GET',
        credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) throw new Error(data.message)
            return data
        })
}

export function newAccount(data) {
    return fetch(`${PATH_BACK}/users/signup`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => data)
}

export function updateMyAccount(data) {
    return fetch(`${PATH_BACK}/users/update`, {
        method: 'PUT',
        credentials: "include",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => data)
}

export function verifyProperty(data) {
    const { property } = data
    return fetch(`${PATH_BACK}/users/verify/${property}`, {
        method: 'POST',
        credentials: "include",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => data)
}

export async function lookingForUserLoged(){
    try {
        const user = await fetchwhoAmI()
        const userDataFront = userDataFromBackToFront(user)
        return userDataFront
    } catch(error) {
      return {message: error.message}
    }
}

export function requestCookie(tokenUser) {
    return fetch(`${PATH_BACK}/users/verify-token`, {
        method: 'POST',
        credentials: "include",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({tokenUser})
    })
        .then(data => {
            return data.json()
        })
}

export async function saveToken( tokenUser ) {
    const response = await requestCookie( tokenUser )
    if (response.message !== 'valid token') return alert(response.message)
    window.location.href = "/menu"
}