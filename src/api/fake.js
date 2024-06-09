import * as JSURL from 'jsurl'
import { queryClient } from '../query-client'
import { auth } from '../services'
import { queryKey } from '../services/const'
import { url } from './url'

const fakeRequest = (config) => {
  const tokens = auth.tokens()

  switch (config.url) {
    case url.accAdd:
      config.data = extractData(config.data)
      break
    case url.login:
      config.data = Object.fromEntries(config.data)
      break
    case url.sendOrder:
      config.data = {
        userId: auth.userId(),
        products: JSON.parse(Object.fromEntries(config.data).sendCart),
      }
      break
    case url.search:
      const { search } = Object.fromEntries(config.params)
      config.params = { q: search }
      break
    case url.accAction:
      config.url = `${url.accAction}${auth.userId()}`
      if (config.method === 'put') config.data = extractData(config.data)
      break
    case url.getOrders:
      config.url = `${url.getOrders}${auth.userId}`
      break
    case url.product:
      config.url = `${url.product}${config.params.productId}`
      break
    case url.categoryProducts:
      const params = config.params
      config.url = `${url.categoryProducts}${params.category}`
      config.params = params.params
      break
    default:
  }

  if (tokens?.token && config.url !== url.refreshSession) {
    config.headers.Authorization = `Bearer ${tokens.token}`
    const refresh = queryClient.getQueryData([queryKey.refreshSession])
    if (!refresh) auth.refreshTokens()
  }

  return config
}

const fakeResponse = (response) => {
  if (!response.data) {
    return { error: response.status }
  }

  switch (response.config.url) {
    case url.refreshSession:
      auth.setTokens(response.data.token, response.data.refreshToken)
      response.data = auth.tokens()
      break
    case url.accData:
      const fakeResponse = queryClient.getQueryData([queryKey.account])
      if (fakeResponse)
        response.data = !fakeResponse.isDeleted ? fakeResponse : response.data
      break
    case url.search:
      const data = response.data.products
      response.data = data
      break
    default:
  }

  if (response.config.url.includes(url.categoryProducts)) {
    return fakeFilter(response.config.params, response.data.products)
  }
  return response.data
}

const products = {
  characteristicList: [
    { id: 0, name: 'characteristic 1', value: 'value' },
    { id: 1, name: 'characteristic 2', value: 'value' },
    { id: 2, name: 'characteristic 3', value: 'value' },
    { id: 3, name: 'characteristic 4', value: 'value' },
    { id: 4, name: 'characteristic 5', value: 'value' },
    { id: 5, name: 'characteristic 6', value: 'value' },
    { id: 6, name: 'characteristic 7', value: 'value' },
  ],
  banners: [
    {
      id: 0,
      height: '300',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpm8ggYFKxhu7VzOcT1-p7qymXhRvB7hHMzw&usqp=CAU',
      alt: 'duff beer',
      content: "It's Always Time For Duff!",
      route: '',
      bp: { xs: 12 },
    },
    {
      id: 1,
      height: '170',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRja2PDqyQctVeu2DNOIcGCZOGugGx6pvnf7w&usqp=CAU',
      alt: 'merry christmas',
      content: 'Merry Christmas, Meine Dammen und Herren!',
      route: '',
      bp: { xs: 12, sm: 6 },
    },
    {
      id: 2,
      height: '170',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZB-o26Kikh5XzpH5yjLeGPp3NhEuFV0J5WQ&usqp=CAU',
      alt: 'winter collection',
      content:
        'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
      route: '',
      bp: { xs: 12, sm: 6 },
    },
  ],
}

export { fakeRequest, fakeResponse, products }

const fakeFilter = (params, data) => {
  const { filters } = Object.fromEntries(params)
  const allFilters = JSURL.parse(filters)
  const getBrands = new Set(data.map(({ brand }) => brand))
  const allBrands = [...getBrands]

  if (!allFilters) {
    return {
      categoryProducts: data,
      allBrands,
    }
  } else if (allFilters.brands && allFilters.brands.length > 0) {
    return {
      categoryProducts: data
        .filter((product) => allFilters.brands?.includes(product.brand))
        .toSorted(toSort(allFilters)),
      allBrands,
    }
  } else {
    return {
      categoryProducts: data.toSorted(toSort(allFilters)),
      allBrands,
    }
  }
}

const extractData = (formData) => {
  const data = Array.from(formData.entries())
    .map(mainMap)
    .reduce(mainReduce, {})
  return data
}

const toSort = (filters) => {
  if (filters.sort === 1) {
    return ab
  } else if (filters.sort === 2) {
    return ba
  } else if (filters.sort === 3) {
    return maxMin
  } else {
    return minMax
  }
}

const ab = (a, b) => {
  let x = a.title.toLowerCase()
  let y = b.title.toLowerCase()
  if (x < y) {
    return -1
  }
  if (x > y) {
    return 1
  }
  return 0
}

const ba = (a, b) => {
  let y = a.title.toLowerCase()
  let x = b.title.toLowerCase()
  if (x < y) {
    return -1
  }
  if (x > y) {
    return 1
  }
  return 0
}
const minMax = (a, b) => a.price - b.price
const maxMin = (a, b) => b.price - a.price

const mainMap = ([key, value]) => {
  const keyName = key.split('.')
  if (keyName.length === 1) {
    return [key, value]
  } else {
    return [keyName[0], { [keyName[1]]: value }]
  }
}

const mainReduce = (acc, curr) => {
  if (acc[curr[0]] === undefined) {
    return { ...acc, [curr[0]]: curr[1] }
  } else {
    return { ...acc, [curr[0]]: { ...acc[curr[0]], ...curr[1] } }
  }
}
