import { instance } from '../api'
import { url } from '../api/url'
import { queryClient } from '../query-client'
import { queryKey } from './const'
import { calculations } from './utilities'

const userCart = {
  cart: () => JSON.parse(localStorage.getItem('cart')),
  setCart: (value) => {
    localStorage.setItem('cart', JSON.stringify(value))
    return null
  },
  removeCart: () => localStorage.removeItem('cart'),
  deleteProduct: (formData) => {
    const { itemId } = Object.fromEntries(formData)
    const cart = userCart.cart()
    const deleteProducts = cart.productsCart.filter(
      (product) => product.id !== Number(itemId),
    )
    if (deleteProducts.length === 0) {
      userCart.setCart(null)
      return null
    }
    newCart(deleteProducts)
    return null
  },
  editQuantity: async (formData) => {
    const { quantity, itemId } = Object.fromEntries(formData)
    const cart = userCart.cart()
    const editQuantity = cart.productsCart.map((product) =>
      product.id === Number(itemId)
        ? {
            ...product,
            quantity:
              quantity === 'plus' ? product.quantity + 1 : product.quantity - 1,
          }
        : product,
    )
    newCart(editQuantity)
    return null
  },
  addProduct: async (formData) => {
    const { buyProduct } = Object.fromEntries(formData)
    const cart = userCart.cart()
    const product = JSON.parse(buyProduct)
    const discountedPrice = Math.round(
      product.price * ((100 - product.discountPercentage) / 100),
    )
    const newProduct = {
      ...product,
      quantity: 1,
      discountedPrice: discountedPrice,
      total: product.price,
    }
    const addProducts =
      cart === null
        ? [newProduct]
        : cart.productsCart.filter((product) => product.id === newProduct.id)
            .length > 0
        ? cart.productsCart
        : [...cart.productsCart, newProduct]
    newCart(addProducts)
    return null
  },
}

const auth = {
  userId: () => localStorage.getItem('userId'),
  tokens: () => JSON.parse(localStorage.getItem('tokens')),
  setUserId: (value) => localStorage.setItem('userId', value),
  setTokens: (token, refreshToken) => {
    localStorage.setItem('tokens', JSON.stringify({ token, refreshToken }))
  },
  removeUserData: () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('tokens')
  },
  check: (request) => {
    const tokens = auth.tokens()
    if (!tokens?.token) {
      const params = new URLSearchParams()
      const value = request ? new URL(request?.url).pathname : '/'
      params.set('from', value)
      return params.toString()
    } else {
      return null
    }
  },
  refreshTokens: () => {
    const tokens = auth.tokens()
    queryClient.fetchQuery({
      queryKey: [queryKey.refreshSession],
      queryFn: () =>
        instance.post(url.refreshSession, {
          refreshToken: tokens?.refreshToken,
          expiresInMins: 90,
        }),
      gcTime: 60 * 60 * 1000,
    })
  },
}

export { auth, userCart }

const newCart = (value) => {
  const { totalPrice, totalPriceWithDiscount, totalDiscount } =
    calculations(value)
  const newCart = {
    productsCart: value,
    totalPrice: totalPrice,
    totalPriceWithDiscount: totalPriceWithDiscount,
    totalDiscount: totalDiscount,
  }
  userCart.setCart(newCart)
  return null
}
