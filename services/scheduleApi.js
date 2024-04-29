const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK

export function getAllSchedules() {
  return fetch(`${PATH_BACK}/schedules`)
    .then(response => response.json())
    .then(data => {
      return data
    })
  }

export function updateSchedulesHoursOfSchedules(id, newScheduleHours) {
  return fetch(`${PATH_BACK}/schedules/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(newScheduleHours)
  })
    .then(response => response.json())
    .then(data => {
      if (data.message) throw new Error(data.message)
      return data
    })
    .catch(error => ({message: error.message}))
}