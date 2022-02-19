import { createToken } from '../../api/token.js'
import { me } from '../../api/user.js'
import {
  getToken,
  setToken,
  removeToken,
  setCurrentUser,
  removeCurrentUser,
  getCurrentUser,
} from '../../utils/auth.js'

const state = {
  currentUser: {
    username: '',
    nickname: '',
    roles: [],
  },
  token: getToken(),
}

const getters = {
  nicknameFirstWord: (state) => {
    return getCurrentUser() && getCurrentUser().nickname
      ? getCurrentUser().nickname.slice(0, 3)
      : '未登录'
  },
}

const actions = {
  login({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      createToken({ username, password })
        .then((token) => {
          commit('SET_TOKEN', token)
          setToken(token)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchCurrentUser({ commit }) {
    return new Promise((resolve, reject) => {
      me()
        .then((currentUser) => {
          commit('SET_USER', currentUser)
          setCurrentUser(currentUser)
          resolve(currentUser)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // user logout
  logout({ commit }) {
    commit('SET_TOKEN', '')
    commit('SET_USER', null)
    removeToken()
    removeCurrentUser()
  },
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, currentUser) => {
    state.currentUser = currentUser
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
