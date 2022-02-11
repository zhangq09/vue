import { createStore, createLogger } from 'vuex'
import user from './modules/user.js'
import permissions from './modules/permissions.js'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    user,
    permissions,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})
