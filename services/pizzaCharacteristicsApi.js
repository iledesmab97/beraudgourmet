const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK

export function getAllMasses() {
    return fetch(`${PATH_BACK}/pizzaMasses`)
        .then(response => response.json())
        .then(data => data)
}

export function getAllSizes() {
    return fetch(`${PATH_BACK}/pizzaSizes`)
        .then(response => response.json())
        .then(data => data)
}

export function addNewSize(size) {
    return fetch(`${PATH_BACK}/pizzaSizes`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({size})
      })
        .then(response => {
          return response.json()
        })
        .then(response => {
          if (response.message) throw new Error(response.message)
          return response
        })
        .catch(error => ({message: error.message}))
}

export function deleteSize(size) {
    return fetch(`${PATH_BACK}/pizzaSizes`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({size})
      })
        .then(response => {
          return response.json()
        })
        .then(response => {
          if (response.message) throw new Error(response.message)
          return response
        })
        .catch(error => ({message: error.message}))
}