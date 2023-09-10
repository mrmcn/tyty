import { defer } from 'react-router'
import { queryClient } from '../..'

export const loader = () => {
  return defer({
    products: queryClient.fetchQuery({
      queryKey: ['jewerely'],
      queryFn: async () => {
        const response = await fetch(
          'https://fakestoreapi.com/products/category/jewelery',
        )
        return response.json()
      },
    }),
  })
}
