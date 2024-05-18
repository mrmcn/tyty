import axios from 'axios'
import { auth } from '.'
import { storage } from '../services/utilities'

export const instance = axios.create({ baseURL: 'https://dummyjson.com' })

const checkTokenInterceptor = (config) => {
  const token = storage.getToken()
  token && (config.headers.Authorization = `Bearer ${token}`)

  return config
}
instance.interceptors.request.use(checkTokenInterceptor)

const responseSuccessInterceptor = (response) => {
  const data = response.data
  const token = storage.getToken()
  token && response.config.url !== '/auth/refresh' && auth.refreshSession()

  if (!data) {
    return { error: response.status }
  }

  if (data.products) {
    return data.products
  }

  return data
}
instance.interceptors.response.use(responseSuccessInterceptor)
