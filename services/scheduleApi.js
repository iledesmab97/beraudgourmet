const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK

export function getAllSchedules() {
  console.log('URL:', `${PATH_BACK}/schedules`)
  return fetch(`${PATH_BACK}/schedules`)
    .then(response => response.json())
    .then(data => {
      return data
    })
  }