import { createStore, createLogger } from 'vuex'
import user from './modules/user.js'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    user,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})
