import axiosClient from './axiosClient'

export function getItineraries() {
  return axiosClient.get('/itineraries')
}

export function getItinerary(id) {
  return axiosClient.get(`/itineraries/${id}`)
}

export function createItinerary(data) {
  return axiosClient.post('/itineraries', data)
}

export function updateItinerary(id, data) {
  return axiosClient.put(`/itineraries/${id}`, data)
}

export function deleteItinerary(id) {
  return axiosClient.delete(`/itineraries/${id}`)
}