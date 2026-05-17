import axiosClient from './axiosClient'

export function getProfile() {
  return axiosClient.get('/users/me')
}

export function updateProfile(data) {
  return axiosClient.put('/users/me', data)
}

// Only for admin
export function getAllUsers() {
  return axiosClient.get('/admin/users')
}

// Only for admin
export function deleteUser(id) {
  return axiosClient.delete(`/admin/users/${id}`)
}