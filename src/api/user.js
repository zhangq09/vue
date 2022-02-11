import { get, post } from './request'

export const login = ({ username, password }) => {
  return post('/users/', { username, password })
}

export const search = (pages) => {
  return get('/users/', pages)
}
