import { get, post } from './request'

export const sayHello = () => {
  return get('/hello')
}
