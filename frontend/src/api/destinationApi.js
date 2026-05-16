import axiosClient from './axiosClient'

export function getDestinations(filters = {}) {
  return axiosClient.get('/destinations', { params: filters })
}

export function getDestination(id) {
  return axiosClient.get(`/destinations/${id}`)
}

// only for ADMIN
export function createDestination(data) {
  return axiosClient.post('/destinations', data)
}

// only for ADMIN
export function updateDestination(id, data) {
  return axiosClient.put(`/destinations/${id}`, data)
}

// only for ADMIN
export function deleteDestination(id) {
  return axiosClient.delete(`/destinations/${id}`)
}