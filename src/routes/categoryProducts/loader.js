import { defer } from 'react-router-dom'
import { queryKey } from '../../const'
import { queryClient } from '../../query-client'
import { products } from '../../services'

export const categoriesLoader = ({ request, params }) => {
  return defer({
    products: queryClient.fetchQuery({
      queryKey: [queryKey.products, params.category],
      queryFn: () => products.categoryProducts(params.category, request),
    }),
    allBrands: queryClient.fetchQuery({
      queryKey: [queryKey.brands, params.category],
      queryFn: () => products.brands(params.category),
    }),
  })
}
