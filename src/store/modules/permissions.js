const state = {
  routes: [],
}
const actions = {
  generateRoutes({ commit }) {
    return new Promise((resolove) => {})
  },
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  },
}

const getters = {}

const store = {
  namespaced: true,
  state,
  actions,
  mutations,
}

export default state
