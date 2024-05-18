import { instance } from './axios'
import { url } from './url'

const personalData = {
  all: async () => await instance(url.accData),
  add: async (data) => await instance.post(url.accAdd, data),
  delAcc: async (id) => await instance.delete(url.accAction(id)),
  putAcc: async (id, data) => await instance.put(url.accAction(id), data),
}

const products = {
  categoryProducts: async (category) =>
    await instance(url.categoryProducts(category)),
  brands: async () => await instance(url.brands),
  categories: async () => await instance(url.categories),
  search: async (search) => await instance(url.search(search)),
  product: async (productId) => await instance(url.product(productId)),
}

const auth = {
  login: async (data) => await instance.post(url.login, data),
  refreshSession: async () => {
    try {
      const response = await instance.post(url.refreshSession, {
        expiresInMins: 90,
      })
      return response
    } catch {
      return null
    }
  },
}

export { auth, products, personalData }
