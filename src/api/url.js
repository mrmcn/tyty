export const url = {
  accData: '/user/me',
  accAdd: '/users/add',
  accAction: (id) => `/users/${id}`,
  login: '/auth/login',
  refreshSession: '/auth/refresh',
  categories: '/products/categories',
  product: (productId) => `/products/${productId}`,
  categoryProducts: (category) => `/products/category/${category}`,
  brands: '/products',
  search: (search) => `/products/search?q=${search}`,
}
