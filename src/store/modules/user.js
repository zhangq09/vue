import { login } from '../../api/user.js'
import { resetRouter } from '../../router/index.js'
import { getToken, setToken, removeToken } from '../../utils/auth.js'

const state = {
  User: {
    username: '',
    nickname: '张强',
    token: getToken(),
    roles: [],
  },
}

const getters = {
  nicknameFirstWord: (state) => {
    return state.User.nickname.slice(0, 1)
  },
}

const actions = {
  login({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      login({ username, password })
        .then((response) => {
          const authorization = response.headers['authorization']
          commit('SET_TOKEN', response.data)
          commit('SET_NAME', response.data.username)
          setToken(authorization)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resetRouter()

          dispatch('/', null, { root: true })

          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.User.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.User.username = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
}
