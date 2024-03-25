const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK

export function getAllSchedules() {
  return fetch(`${PATH_BACK}/schedules`)
    .then(response => response.json())
    .then(data => {
      return data
    })
  }