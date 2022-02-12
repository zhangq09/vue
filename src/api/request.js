import axios from 'axios'
import store from '../store'
import { createHeader } from '../utils/auth.js'
import { Notify } from 'quasar'

const baseURL = import.meta.env.VITE_API_HOME

//一定要是baseURL 因为axios.create需要这个参数 ，而用了省略写法 baseURL：baseURL 所以必须要baseURL

const instance = axios.create({
  baseURL,
})

instance.interceptors.request.use(
  (config) => {
    if (store.state.user.token !== undefined && store.state.user.token) {
      config.headers['Authorization'] = createHeader(store.state.user.token)
    }
    return config
  },
  (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    if (response.data.code) {
      handleErrorResponse(response)
      return Promise.reject(response.data)
    }
    return response.data
  },
  (error) => {
    handleErrorResponse(error.response)
    return Promise.reject(error)
  }
)

const handleErrorResponse = (response) => {
  if (response.status === 401 || response.status === 403) {
    store.dispatch('user/logout').then(() => window.location.reload())
  }

  if (response.data instanceof Array) {
    response.data.forEach((item) => {
      Notify.create({
        type: 'negative',
        message: item.message,
        position: 'top',
      })
    })
  } else {
    Notify.create({
      type: 'negative',
      message: response.data.message,
      position: 'top',
    })
  }
}

const { get, post, put } = instance

export { get, post, put }
