import axios from 'axios'
import store from '../store'
const baseURL = import.meta.env.VITE_API_HOME

//一定要是baseURL 因为axios.create需要这个参数 ，而用了省略写法 baseURL：baseURL 所以必须要baseURL

const instance = axios.create({
  baseURL,
})

instance.interceptors.request.use(
  (config) => {
    if (store.state.user.User.token) {
      config.headers['Authorization'] = store.state.user.User.token
    }
    return config
  },
  (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

const { get, post, put } = instance

export { get, post, put }
