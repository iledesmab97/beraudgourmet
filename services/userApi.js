import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'
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
    // const tokenUser = Cookies.get('tokenUser')
    // if (!tokenUser) return false
    try {
        console.log('quiero saber quien soy')
        const user = await fetchwhoAmI()
        console.log('mi respuesta es:', user)
        const userDataFront = userDataFromBackToFront(user)
        return userDataFront
    } catch(error) {
        console.log('algo salió mal y entré en el error de lookingForUserLoged')
      return {message: error.message}
    }
}

export function requestCookie(data) {
    console.log('la data debe ser igual al tokenUser pero encerrado en un objeto:', data)
    return fetch(`${PATH_BACK}/users/verify-token`, {
        method: 'POST',
        credentials: "include",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(data => {
            return data.json()
        })
}

export async function saveToken({ tokenUser }) {
    // Cookies.set('tokenUser', tokenUser, { SameSite, Path, expires, Secure })
    console.log('tokenUser desde saveToken:', tokenUser)
    const response = await requestCookie({ tokenUser })
    console.log('la response de la solicitud de la cookie')
    if (response.message !== 'valid token') return alert(response.message)
    // saveUserLogedInLocalStorage()
    // window.location.href = "/menu"
}

export function saveUserLogedInLocalStorage() {
    localStorage.setItem('loged', 'true')
}

export function removeUserLogedInLocalStorage() {
    localStorage.removeItem('loged')
}