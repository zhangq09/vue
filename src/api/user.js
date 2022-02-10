import { post } from './request'

export const login = ({ username, password }) => {
  return post('/users/', { username, password })
}
