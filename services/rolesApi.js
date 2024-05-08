const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK

export function getAllRoles() {
    return fetch(`${PATH_BACK}/roles`, {
        credentials: "include"
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            return data
        })
}