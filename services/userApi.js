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

export function fetchwhoAmI(cookie) {
    const settings = { method: 'GET' }
    if (cookie) {
        const cookieValue = cookie
        settings.headers = {
            'Content-Type': 'application/json',
            'verification-token': cookieValue
        }
    } else {
        settings.credentials = 'include'
    }
    return fetch(`${PATH_BACK}/users/loged`, settings)
        .then(response => response.json())
        .then(data => {
            if (data.message) throw new Error(data.message)
            return data
        })
        .catch(error => ({message: error.message}))
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

export async function lookingForUserLoged( token ) {
    try {
        const user = await fetchwhoAmI( token )
        if (user.message) throw new Error(user.message)
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
    const response = await fetchwhoAmI(tokenUser)
    if (response.message) {
        alert(response.message)
        return {message: response.message}
    }
    localStorage.setItem('user', JSON.stringify(tokenUser))
    const userDataFront = userDataFromBackToFront(response)
    return userDataFront
}

export function getAllUsers(status) {
    const querys = status === 'all' ? '?all=true' : ''
    return fetch(`${PATH_BACK}/users${querys}`, {
        credentials: "include"
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            return data
        })
}

export function updateAccount(id, data) {
    return fetch(`${PATH_BACK}/users/update/${id}`, {
        method: 'PUT',
        credentials: "include",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => data)
}

export function searchUser(email) {
    if (!email) return null
    return fetch(`${PATH_BACK}/users/registered?email=${email}`)
        .then(res => res.json())
        .then(data => {
            return data
        })
}

export function requestPasswordRecovery(email) {
    if (!email) return null
    return fetch(`${PATH_BACK}/users/request-password-recovery/${email}`)
        .then(res => res.json())
        .then(data => {
            return data
        })
}

export function forgetPassword({token}) {
    return fetch(`${PATH_BACK}/users/reset-password`, {
        method: 'PUT',
        credentials: "include",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(token)
    })
        .then(response => response.json())
        .then(data => data)
}

export function whatHappen(data) {
    return fetch(`${PATH_BACK}/users/seeData`, {
        method: 'POST',
        credentials: "include",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => data)
}