import Cookies from 'js-cookie'

const TokenKey = 'zq-token'

const UserKey = 'current-user'

export function getToken() {
  const token = Cookies.get(TokenKey)
  return token === undefined ? null : token
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export const createHeader = (token) => {
  return 'Bearer ' + token
}

export function getCurrentUser() {
  const user = Cookies.get(UserKey)
  return user === undefined ? null : JSON.parse(user)
}

export function setCurrentUser(currentUser) {
  return Cookies.set(UserKey, JSON.stringify(currentUser))
}

export function removeCurrentUser() {
  return Cookies.remove(UserKey)
}
