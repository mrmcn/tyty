import { defer } from 'react-router'
import { queryClient } from '../..'

export const loader = () => {
  return defer({
    products: queryClient.fetchQuery({
      queryKey: ['products'],
      queryFn: async () => {
        const response = await fetch('https://fakestoreapi.com/products')
        return response.json()
      },
    }),
  })
}
