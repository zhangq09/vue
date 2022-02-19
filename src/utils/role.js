import { getCurrentUser } from '../utils/auth.js'
import menuRoutes from '../router/menuRoutes.js'
export function isAdmin() {
  if (!getCurrentUser()) {
    return false
  }
  return getCurrentUser().roles.filter((r) => {
    if (r.name === 'ROLE_USER_ADMIN') {
      return r
    }
  }).length > 0
    ? true
    : false
}

export function adminRole() {
  return menuRoutes
    .filter((r) => {
      return r.meta.isAdmin === true
    })
    .map((r) => {
      return r.path
    })
}
