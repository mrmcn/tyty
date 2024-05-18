import * as JSURL from 'jsurl'
import {
  auth as authAPI,
  personalData as dataAPI,
  products as productsAPI,
} from '../api'
import { queryClient } from '../query-client'
import { allData, toSort } from './utilities'
import { queryKey } from '../const'
export * from '../api'

const auth = {
  ...authAPI,
  login: (formData) => {
    const data = allData(formData)
    return authAPI.login(data)
  },
}

const personalData = {
  ...dataAPI,
  all: () => {
    const fakeResponse = queryClient.getQueryData([queryKey.account])
    if (fakeResponse)
      if (!fakeResponse.isDeleted) {
        return fakeResponse
      }
    return dataAPI.all()
  },
  add: (formData) => {
    const data = allData(formData)
    return dataAPI.add(data)
  },
  putAcc: (id, formData) => {
    const data = allData(formData)
    return dataAPI.putAcc(id, data)
  },
}

const products = {
  ...productsAPI,
  categoryProducts: async (category, allFilters) => {
    const response = await productsAPI.categoryProducts(category)
    const filters = JSURL.parse(allFilters)
    if (!allFilters) {
      return response
    } else if (filters.brands && filters.brands.length > 0) {
      return response
        .filter((product) => filters.brands?.includes(product.brand))
        .toSorted(toSort(filters))
    } else {
      return response.toSorted(toSort(filters))
    }
  },

  brands: async (params) => {
    const response = await productsAPI.brands()
    const filtersBrand = new Set(
      response
        .filter(({ category }) => category === params)
        .map(({ brand }) => brand),
    )
    return [...filtersBrand]
  },
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

export { auth, personalData, products }
