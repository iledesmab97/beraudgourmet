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
            if (data.message) return data.message
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
    const tokenUser = Cookies.get('tokenUser')
    if (!tokenUser) return false
    try {
        const user = await fetchwhoAmI()
        const userDataFront = userDataFromBackToFront(user)
        return userDataFront
    } catch(error) {
      return {message: error.message}
    }
}

export async function saveToken({ tokenUser, SameSite, Path, expires, Secure }) {
    Cookies.set('tokenUser', tokenUser, { SameSite, Path, expires, Secure })
    const currentCookie = Cookies.get('tokenUser')
}