export function getAllSchedules() {
    return fetch('http://localhost:3000/api/schedules')
      .then(response => response.json())
      .then(data => {
        return data
      })
  }