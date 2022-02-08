import axios from 'axios'
const baseURL = import.meta.env.VITE_API_HOME

//一定要是baseURL 因为axios.create需要这个参数 ，而用了省略写法 baseURL：baseURL 所以必须要baseURL
const instance = axios.create({
  baseURL,
})

const { get, post, put } = instance

export { get, post, put }
