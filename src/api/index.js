import axios from 'axios'
import { fakeRequest, fakeResponse } from './fake'
import { url } from './url'

export const instance = axios.create({ baseURL: url.baseURL })

instance.interceptors.request.use((config) => fakeRequest(config))

instance.interceptors.response.use(
  (response) => fakeResponse(response),
  (error) => {
    console.log('THIS IS ERROR!!!!!!!!', error)
    // if (response.status === 401) auth.removeUserData()
    // return null
    // return Promise.reject(error)
  },
)
