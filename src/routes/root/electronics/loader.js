import { defer } from 'react-router'
import { queryClient } from '../..'

export const loader = () => {
  return defer({
    products: queryClient.fetchQuery({
      queryKey: ['electronics'],
      queryFn: async () => {
        const response = await fetch(
          'https://fakestoreapi.com/products/category/electronics',
        )
        return response.json()
      },
    }),
  })
}
