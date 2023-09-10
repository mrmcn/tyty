import { defer } from 'react-router'
import { queryClient } from '../..'

export const loader = () => {
  return defer({
    products: queryClient.fetchQuery({
      queryKey: ['womensclothing'],
      queryFn: async () => {
        const response = await fetch(
          'https://fakestoreapi.com/products/category/women%27s%20clothing',
        )
        return response.json()
      },
    }),
  })
}
