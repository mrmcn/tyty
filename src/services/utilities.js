const extract = async (request) => {
  const method = await request.method

  if (method === 'GET') {
    const url = new URL(request.url)
    const allFilters = url.searchParams.get('filters')
    const search = url.searchParams.get('search')

    return { method, allFilters, search }
  }
  const formData = await request.formData()
  const search = await formData.get('search')
  const id = await formData.get('userId')
  const redirectTo = await formData.get('redirectTo')
  const action = await formData.get('quantity')
  const productId = await formData.get('itemId')
  const buyProduct = JSON.parse(formData.get('buyProduct'))

  return {
    method,
    formData,
    id,
    redirectTo,
    search,
    action,
    productId,
    buyProduct,
  }
}

const storage = {
  setCart: (value) => localStorage.setItem('cart', value),
  getCart: () => localStorage.getItem('cart'),
  removeCart: () => localStorage.removeItem('cart'),
  setToken: (value) => localStorage.setItem('userToken', value),
  getToken: () => localStorage.getItem('userToken'),
  removeToken: () => localStorage.removeItem('userToken'),
}

const addProduct = async (request) => {
  const cart = JSON.parse(storage.getCart())
  const { buyProduct } = await extract(request)
  const discountedPrice = Math.round(
    buyProduct.price * ((100 - buyProduct.discountPercentage) / 100),
  )
  const newProduct = {
    ...buyProduct,
    quantity: 1,
    discountedPrice: discountedPrice,
    total: buyProduct.price,
  }
  const addProduct =
    cart === null
      ? [newProduct]
      : cart.filter((product) => product.id === newProduct.id).length > 0
      ? cart
      : [...cart, newProduct]
  const total = addProduct
    .map((product) => product.price * product.quantity)
    .reduce((accumulator, currentValue) => accumulator + currentValue)
  const withDiscount = addProduct
    .map((product) => product.discountedPrice * product.quantity)
    .reduce((accumulator, currentValue) => accumulator + currentValue)
  const totalDiscount = total - withDiscount
  const newCart = {
    cart: addProduct,
    total: total,
    withDiscount: withDiscount,
    totalDiscount: totalDiscount,
  }
  storage.setCart(JSON.stringify(newCart))
}

const editCart = async (request) => {
  const cart = JSON.parse(storage.getCart())
  const { productId, action, method } = await extract(request)
  const newCart =
    method === 'DELETE'
      ? cart.filter((product) => product.id !== Number(productId))
      : cart.map((product) =>
          product.id === Number(productId)
            ? {
                ...product,
                quantity:
                  action === 'plus'
                    ? product.quantity + 1
                    : product.quantity - 1,
              }
            : product,
        )
  return newCart
}

export { extract, storage, addProduct, editCart }
