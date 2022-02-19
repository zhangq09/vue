import { createUser, search } from '../api/user.js'

export const useCreateUser = (user) => {
  return new Promise((resolve, reject) => {
    createUser({
      username: user.username,
      nickname: user.nickname,
      password: user.password,
      gender: user.gender.value,
      roles: user.roles.map((r) => {
        return r.value
      }),
    })
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const useSearchUser = (pagination) => {
  return new Promise((resolve, reject) => {
    search({
      page: pagination.value.page,
      size: pagination.value.rowsPerPage,
    })
      .then((data) => {
        if (data.content instanceof Array) {
          resolve(data.content)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}
