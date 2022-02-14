import store from '../store'

export function isAdmin() {
  return store.state.user.currentUser.roles.filter((r) => {
    if (r.name === 'ROLE_USER_ADMIN') {
      return r
    }
  }).length > 0
    ? true
    : false
}
