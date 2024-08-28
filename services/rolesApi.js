import { requestSettings } from '@/utils/preparingData'

const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK

export function getAllRoles() {
    return fetch(`${PATH_BACK}/roles`, {
        ...requestSettings()
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            if (data.message) throw new Error(data.message)
            return data
        })
        .catch(error => ({message: error.message}))
}