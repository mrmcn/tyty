import {
  auth as authFake,
  personalData as dataFake,
  products as productsFake,
} from '../fake'
import { addProduct, editCart, extract, storage } from './utilities'
export * from '../api'

const personalData = {
  ...dataFake,
  add: async (request) => {
    const { formData } = await extract(request)
    return await dataFake.add(formData)
  },
  account: async (request) => {
    const { method, formData, id } = await extract(request)
    if (method === 'DELETE') {
      storage.removeToken()
      return await dataFake.delAcc(id)
    } else {
      return await dataFake.putAcc(id, formData)
    }
  },
}

const userCart = {
  updateCart: async (request) => {
    addProduct(request)
    return null
  },
  editCart: async (request) => {
    const newCart = editCart(request)
    return newCart
  },
}

const auth = {
  ...authFake,
  logout: () => storage.removeToken(),
  check: (request) => {
    if (!storage.getToken()) {
      const params = new URLSearchParams()
      const value = request ? new URL(request?.url).pathname : '/'
      params.set('from', value)
      return params.toString()
    } else {
      return null
    }
  },
  login: async (request) => {
    const { formData, redirectTo } = await extract(request)
    const response = await authFake.login(formData)
    storage.setToken(response.token)
    return { token: response.token, redirectTo }
  },
  refreshSession: async () => {
    const response = await authFake.refreshSession()
    if (response?.data) {
      storage.setToken(response?.data.token)
      return response.data.token
    } else {
      return null
    }
  },
}

const products = {
  ...productsFake,
  categoryProducts: async (category, request) => {
    const { allFilters } = await extract(request)
    return productsFake.categoryProducts(category, allFilters)
  },
  brands: async (params) => productsFake.brands(params),
  search: async (request) => {
    const { search } = await extract(request)
    return await productsFake.search(search)
  },
}

export { auth, personalData, products, userCart }
